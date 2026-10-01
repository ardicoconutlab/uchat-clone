import { withWorkspaceTransaction } from "@/lib/db/tenant";
import { conversationStore, flowStore } from "@/lib/domain/memory-store";
import { Conversation, ConversationMessage, FlowDefinition } from "@/lib/domain/types";

const formatClock = (value: Date | null) => value ? value.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "Now";

function asDirection(value: string): ConversationMessage["direction"] {
  if (value === "inbound") return "in";
  if (value === "automation") return "bot";
  return "out";
}

export async function listConversations(workspaceId?: string): Promise<Conversation[]> {
  if (!workspaceId) return conversationStore.list();
  return withWorkspaceTransaction(workspaceId, async (client) => {
    const result = await client.query<{
      id: string; contact_name: string | null; phone: string | null; status: Conversation["status"]; automation_paused_until: Date | null; assigned_user_id: string | null; last_message_at: Date | null;
    }>(`select c.id, c.status, c.automation_paused_until, c.assigned_user_id, c.last_message_at,
          coalesce(ct.display_name, 'Unknown contact') as contact_name,
          ci.normalized_address as phone
        from conversations c
        join contacts ct on ct.workspace_id = c.workspace_id and ct.id = c.contact_id
        left join lateral (
          select normalized_address from channel_identities
          where workspace_id = c.workspace_id and contact_id = c.contact_id
          order by created_at asc limit 1
        ) ci on true
        order by c.last_message_at desc nulls last, c.created_at desc`);
    return result.rows.map((row) => ({
      id: row.id,
      contactId: "",
      contactName: row.contact_name ?? "Unknown contact",
      phone: row.phone ?? "",
      channel: "whatsapp",
      status: row.status,
      automationPaused: Boolean(row.automation_paused_until && row.automation_paused_until > new Date()),
      assignedAgentId: row.assigned_user_id,
      preview: "",
      updatedAt: (row.last_message_at ?? new Date()).toISOString()
    }));
  });
}

export async function listMessages(conversationId: string, workspaceId?: string): Promise<ConversationMessage[]> {
  if (!workspaceId) return conversationStore.messagesFor(conversationId);
  return withWorkspaceTransaction(workspaceId, async (client) => {
    const result = await client.query<{ id: string; direction: string; body: { text?: string }; created_at: Date }>(
      "select id, direction, body, created_at from messages where workspace_id = app.current_workspace_id() and conversation_id = $1 order by created_at asc",
      [conversationId]
    );
    return result.rows.map((row) => ({ id: row.id, conversationId, direction: asDirection(row.direction), body: row.body.text ?? "", at: formatClock(row.created_at), label: row.direction === "automation" ? "Sent by automation" : row.direction === "outbound" ? "Sent by you" : undefined }));
  });
}

export async function addAgentMessage(conversationId: string, body: string, workspaceId?: string): Promise<ConversationMessage> {
  if (!workspaceId) return conversationStore.addMessage(conversationId, body);
  return withWorkspaceTransaction(workspaceId, async (client) => {
    const inserted = await client.query<{ id: string; created_at: Date }>(
      `insert into messages (workspace_id, conversation_id, connection_id, direction, client_intent_id, body, delivery_status, sent_at)
       select c.workspace_id, c.id, c.connection_id, 'outbound', gen_random_uuid(), jsonb_build_object('type', 'text', 'text', $2), 'pending', now()
       from conversations c where c.workspace_id = app.current_workspace_id() and c.id = $1
       returning id, created_at`,
      [conversationId, body]
    );
    if (!inserted.rowCount) throw new Error("Conversation not found");
    await client.query("update conversations set automation_paused_until = now() + interval '30 minutes', last_message_at = now(), updated_at = now() where workspace_id = app.current_workspace_id() and id = $1", [conversationId]);
    await client.query("insert into outbox_events (workspace_id, topic, deduplication_key, payload) values (app.current_workspace_id(), 'message.dispatch', $1, jsonb_build_object('conversationId', $2))", [`agent-message:${inserted.rows[0].id}`, conversationId]);
    return { id: inserted.rows[0].id, conversationId, direction: "out", body, at: formatClock(inserted.rows[0].created_at), label: "Queued for delivery" };
  });
}

export async function setAutomationPaused(conversationId: string, paused: boolean, workspaceId?: string): Promise<Conversation> {
  if (!workspaceId) return conversationStore.setAutomationPaused(conversationId, paused);
  return withWorkspaceTransaction(workspaceId, async (client) => {
    const result = await client.query<{ id: string; automation_paused_until: Date | null }>(
      "update conversations set automation_paused_until = case when $2 then now() + interval '30 minutes' else null end, updated_at = now() where workspace_id = app.current_workspace_id() and id = $1 returning id, automation_paused_until",
      [conversationId, paused]
    );
    if (!result.rowCount) throw new Error("Conversation not found");
    return { id: result.rows[0].id, contactId: "", contactName: "", phone: "", channel: "whatsapp", status: "open", automationPaused: Boolean(result.rows[0].automation_paused_until), assignedAgentId: null, preview: "", updatedAt: new Date().toISOString() };
  });
}

export async function listFlows(workspaceId?: string): Promise<FlowDefinition[]> {
  if (!workspaceId) return flowStore.list();
  return withWorkspaceTransaction(workspaceId, async (client) => {
    const result = await client.query<{ id: string; name: string; status: FlowDefinition["status"]; published_version: number | null; draft_graph: Pick<FlowDefinition, "nodes" | "edges"> }>(
      "select id, name, status, published_version, draft_graph from flows where workspace_id = app.current_workspace_id() order by updated_at desc"
    );
    return result.rows.map((row) => ({ id: row.id, name: row.name, status: row.status, version: row.published_version ?? 1, trigger: "", nodes: row.draft_graph.nodes ?? [], edges: row.draft_graph.edges ?? [] }));
  });
}
