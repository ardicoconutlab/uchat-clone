import { Campaign, Contact, Conversation, ConversationMessage, FlowDefinition, MessageDirection, MessageTemplate } from "./types";
import { validateFlowForPublish } from "@/lib/flow/validate";

const now = () => new Date().toISOString();

const conversations: Conversation[] = [
  {
    id: "conv_ardi",
    contactId: "contact_ardi",
    contactName: "Ardi Wirawan",
    phone: "+628556551544",
    channel: "whatsapp",
    status: "open",
    automationPaused: false,
    assignedAgentId: null,
    preview: "UChat automation test…",
    updatedAt: now()
  }
];

const messages: ConversationMessage[] = [
  {
    id: "msg_inbound_research",
    conversationId: "conv_ardi",
    direction: "in",
    body: "Uchat research test",
    at: "11:15 PM"
  },
  {
    id: "msg_automation_acknowledgement",
    conversationId: "conv_ardi",
    direction: "bot",
    body: "UChat automation test: the recipient condition passed. This is an automated research message.",
    at: "11:15 PM",
    label: "Sent by automation"
  }
];

const flows: FlowDefinition[] = [
  {
    id: "flow_research_keyword",
    name: "WhatsApp research acknowledgement",
    status: "draft",
    version: 1,
    trigger: "Keyword: uchat research test",
    nodes: [
      { id: "start", type: "Start", label: "Keyword: uchat research test" },
      { id: "condition_phone", type: "Condition", label: "Phone is +62 855 6551 544" },
      { id: "message_ack", type: "Message", label: "Send acknowledgement" }
    ],
    edges: [
      { source: "start", target: "condition_phone" },
      { source: "condition_phone", target: "message_ack", output: "match" }
    ]
  }
];

export class FlowPublishError extends Error {
  constructor(readonly issues: ReturnType<typeof validateFlowForPublish>) {
    super("Flow cannot be published");
  }
}

function requireConversation(conversationId: string) {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) throw new Error("Conversation not found");
  return conversation;
}

export const conversationStore = {
  list: () => conversations.map((conversation) => ({ ...conversation })),
  messagesFor: (conversationId: string) => {
    requireConversation(conversationId);
    return messages.filter((message) => message.conversationId === conversationId).map((message) => ({ ...message }));
  },
  addMessage: (conversationId: string, body: string, direction: MessageDirection = "out") => {
    const conversation = requireConversation(conversationId);
    const message: ConversationMessage = {
      id: `msg_${crypto.randomUUID()}`,
      conversationId,
      direction,
      body,
      at: "Now",
      label: direction === "out" ? "Sent by you" : undefined
    };
    messages.push(message);
    conversation.preview = body;
    conversation.updatedAt = now();
    if (direction === "out") conversation.automationPaused = true;
    return { ...message };
  },
  setAutomationPaused: (conversationId: string, paused: boolean) => {
    const conversation = requireConversation(conversationId);
    conversation.automationPaused = paused;
    conversation.updatedAt = now();
    return { ...conversation };
  }
};

export const flowStore = {
  list: () => flows.map((flow) => ({ ...flow, nodes: flow.nodes.map((node) => ({ ...node })), edges: flow.edges.map((edge) => ({ ...edge })) })),
  publish: (flowId: string) => {
    const flow = flows.find((item) => item.id === flowId);
    if (!flow) throw new Error("Flow not found");
    const issues = validateFlowForPublish(flow);
    if (issues.length) throw new FlowPublishError(issues);
    flow.status = "published";
    flow.version += 1;
    return { ...flow, nodes: flow.nodes.map((node) => ({ ...node })), edges: flow.edges.map((edge) => ({ ...edge })) };
  }
};

const templates: MessageTemplate[] = [{ id: "template_broadcast", name: "broadcast", language: "en", category: "marketing", status: "approved", body: "Hello {{name}}, this marketing broadcast…", variables: ["name"], syncedAt: now() }];
const campaigns: Campaign[] = [{ id: "campaign_welcome", name: "September update", templateId: "template_broadcast", status: "draft", audienceCount: 0, scheduledAt: null }];

export const templateStore = { list: () => templates.map((item) => ({ ...item, variables: [...item.variables] })), sync: () => templates.map((item) => ({ ...item, variables: [...item.variables], syncedAt: now() })) };
export const campaignStore = { list: () => campaigns.map((item) => ({ ...item })), create: (name: string, templateId: string) => { if (!templates.some((template) => template.id === templateId && template.status === "approved")) throw new Error("Approved template not found"); const campaign: Campaign = { id: `campaign_${crypto.randomUUID()}`, name, templateId, status: "draft", audienceCount: 0, scheduledAt: null }; campaigns.push(campaign); return { ...campaign }; } };

const contacts: Contact[] = [{ id: "contact_ardi", name: "Ardi Wirawan", phone: "+628556551544", email: null, tags: ["Research"], consent: "opted_in", createdAt: now() }];
export const contactStore = { list: () => contacts.map((item) => ({ ...item, tags: [...item.tags] })), create: (input: Omit<Contact, "id" | "createdAt">) => { const contact = { ...input, id: `contact_${crypto.randomUUID()}`, createdAt: now(), tags: [...input.tags] }; contacts.push(contact); return { ...contact, tags: [...contact.tags] }; } };
