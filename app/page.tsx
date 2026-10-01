"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ReactFlow, Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState, type Connection, type Edge, type Node } from "@xyflow/react";

type Section = "Inbox" | "Flows" | "Contacts" | "Templates" | "Settings";
type Message = { id: string; direction: "in" | "out" | "bot"; body: string; at: string; label?: string };
type Conversation = { id: string; automationPaused: boolean };
type Flow = { id: string; status: "draft" | "published" };

const initialMessages: Message[] = [
  { id: "loading-inbound", direction: "in", body: "Uchat research test", at: "11:15 PM" },
  { id: "loading-automation", direction: "bot", body: "UChat automation test: the recipient condition passed. This is an automated research message.", at: "11:15 PM", label: "Sent by automation" }
];

const nav: { name: Section; icon: string }[] = [
  { name: "Inbox", icon: "◉" },
  { name: "Flows", icon: "⌘" },
  { name: "Contacts", icon: "◒" },
  { name: "Templates", icon: "▧" },
  { name: "Settings", icon: "⚙" }
];

const nodeTypes = [
  ["Message", "Send a text, media, template, list, or WhatsApp Flow"],
  ["Question", "Collect a typed response and wait safely"],
  ["Condition", "Route by contact data, status, consent, or prior response"],
  ["Action", "Update tags, assign agents, call integrations, or pause bot"],
  ["Delay", "Continue at a durable future time"],
  ["Split", "Choose a branch for experiments or distribution"]
];

const initialFlowNodes: Node[] = [
  { id: "start", type: "input", position: { x: 55, y: 95 }, data: { label: "Start · keyword: uchat research test", kind: "Start" }, style: { width: 210 } },
  { id: "condition_phone", position: { x: 320, y: 230 }, data: { label: "Condition · phone matches recipient", kind: "Condition" }, style: { width: 210 } },
  { id: "message_ack", type: "output", position: { x: 585, y: 365 }, data: { label: "Message · send acknowledgement", kind: "Message" }, style: { width: 210 } }
];

const initialFlowEdges: Edge[] = [
  { id: "start-condition", source: "start", target: "condition_phone", animated: true, label: "match recipient" },
  { id: "condition-message", source: "condition_phone", target: "message_ack", label: "match" }
];

export default function Home() {
  const [section, setSection] = useState<Section>("Inbox");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [assigned, setAssigned] = useState(false);
  const [paused, setPaused] = useState(false);
  const [published, setPublished] = useState(false);
  const [selectedNode, setSelectedNode] = useState("Start");
  const [search, setSearch] = useState("");

  useEffect(() => {
    void fetch("/api/conversations/conv_ardi/messages")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Unable to load messages")))
      .then((data: { messages: Message[] }) => setMessages(data.messages))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    void fetch("/api/conversations")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Unable to load conversations")))
      .then((data: { conversations: Conversation[] }) => setPaused(Boolean(data.conversations.find((conversation) => conversation.id === "conv_ardi")?.automationPaused)))
      .catch(() => undefined);
    void fetch("/api/flows")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Unable to load flows")))
      .then((data: { flows: Flow[] }) => setPublished(data.flows.find((flow) => flow.id === "flow_research_keyword")?.status === "published"))
      .catch(() => undefined);
  }, []);

  const visibleMessages = useMemo(
    () => messages.filter((message) => message.body.toLowerCase().includes(search.toLowerCase())),
    [messages, search]
  );

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    const temporaryId = `pending-${Date.now()}`;
    setMessages((current) => [...current, { id: temporaryId, direction: "out", body, at: "Now", label: "Sending…" }]);
    setDraft("");
    setPaused(true);
    try {
      const response = await fetch("/api/conversations/conv_ardi/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body })
      });
      if (!response.ok) throw new Error("Unable to send message");
      const data: { message: Message } = await response.json();
      setMessages((current) => current.map((message) => message.id === temporaryId ? data.message : message));
    } catch {
      setMessages((current) => current.map((message) => message.id === temporaryId ? { ...message, label: "Not sent" } : message));
    }
  }

  async function toggleAutomation() {
    const nextPaused = !paused;
    setPaused(nextPaused);
    try {
      const response = await fetch("/api/conversations/conv_ardi/automation", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paused: nextPaused })
      });
      if (!response.ok) throw new Error("Unable to update automation");
    } catch {
      setPaused(!nextPaused);
    }
  }

  async function publishFlow() {
    if (published) return;
    try {
      const response = await fetch("/api/flows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flowId: "flow_research_keyword" })
      });
      if (!response.ok) throw new Error("Unable to publish flow");
      const data: { flow: Flow } = await response.json();
      setPublished(data.flow.status === "published");
    } catch {
      setPublished(false);
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">C</span><span>ConvoFlow</span></div>
        <div className="workspace"><span className="avatar amber">CW</span><span><strong>Coco Workspace</strong><small>WhatsApp-first</small></span><button aria-label="Workspace menu">⌄</button></div>
        <nav aria-label="Main navigation">
          {nav.map((item) => (
            <button key={item.name} className={section === item.name ? "nav-item active" : "nav-item"} onClick={() => setSection(item.name)}>
              <span>{item.icon}</span>{item.name}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom"><span className="status-dot" /> WhatsApp connected</div>
      </aside>

      <section className="workspace-main">
        <header className="topbar">
          <div><p className="eyebrow">COCO WORKSPACE / WHATSAPP CLOUD</p><h1>{section}</h1></div>
          <div className="top-actions"><button className="ghost">⌕</button><button className="ghost">◌</button><span className="avatar">AW</span></div>
        </header>

        {section === "Inbox" && (
          <div className="inbox-grid">
            <section className="conversation-list panel">
              <div className="panel-top"><strong>Conversations</strong><button className="icon-button">＋</button></div>
              <label className="search"><span>⌕</span><input placeholder="Search conversations" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
              <div className="filters"><button className="filter active">Open <b>1</b></button><button className="filter">Unassigned</button></div>
              <button className="contact-row selected"><span className="avatar sky">AW</span><span><strong>Ardi Wirawan</strong><small>UChat automation test…</small></span><time>11:15</time></button>
              <div className="list-empty">{search && visibleMessages.length === 0 ? "No matching messages" : "1 open conversation"}</div>
            </section>

            <section className="thread panel">
              <div className="thread-header"><div><span className="avatar sky">AW</span><span><strong>Ardi Wirawan</strong><small>WhatsApp · active now</small></span></div><div><button className="ghost">⋯</button><button className={assigned ? "assign assigned" : "assign"} onClick={() => setAssigned(!assigned)}>{assigned ? "Assigned to me" : "Assign"}</button></div></div>
              <div className="service-window"><span>◷</span> Reply freely · 23h 59m remaining</div>
              <div className="message-stack">
                <p className="date-divider">Today</p>
                {visibleMessages.map((message) => <article key={message.id} className={`bubble ${message.direction}`}><span>{message.body}</span><small>{message.label ? `${message.label} · ` : ""}{message.at}</small></article>)}
              </div>
              <form className="composer" onSubmit={sendMessage}>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a reply…" rows={2} />
                <div><button type="button" className="ghost">⌕</button><button type="button" className="ghost">◫</button><button type="submit" className="primary">Send ↗</button></div>
              </form>
            </section>

            <aside className="contact-panel panel">
              <div className="contact-card"><span className="avatar large sky">AW</span><h2>Ardi Wirawan</h2><span className="pill green">Open</span><p>+62 855 6551 544</p><p className="muted">WhatsApp identity</p></div>
              <dl><div><dt>Created</dt><dd>Today</dd></div><div><dt>Opt-in source</dt><dd>Direct</dd></div><div><dt>Email consent</dt><dd className="muted">Not opted in</dd></div><div><dt>Tags</dt><dd><span className="tag">Research</span></dd></div></dl>
              <div className="pause-box"><div><strong>Automation</strong><span>{paused ? "Paused for 30 minutes" : "Running automatically"}</span></div><button className={paused ? "warning-button" : "outline-button"} onClick={toggleAutomation}>{paused ? "Resume" : "Pause"}</button></div>
            </aside>
          </div>
        )}

        {section === "Flows" && <FlowBuilder published={published} publishFlow={publishFlow} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />}
        {section === "Contacts" && <Contacts />}
        {section === "Templates" && <Templates />}
        {section === "Settings" && <Settings />}
      </section>
    </main>
  );
}

function FlowBuilder({ published, publishFlow, selectedNode, setSelectedNode }: { published: boolean; publishFlow: () => void; selectedNode: string; setSelectedNode: (value: string) => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlowEdges);

  function addSelectedNode() {
    if (selectedNode === "Start" && nodes.some((node) => node.data.kind === "Start")) return;
    const id = `node-${Date.now()}`;
    const position = { x: 125 + (nodes.length % 3) * 230, y: 90 + nodes.length * 75 };
    setNodes((current) => [...current, {
      id,
      type: selectedNode === "Start" ? "input" : "default",
      position,
      data: { label: `${selectedNode} · configure this node`, kind: selectedNode },
      style: { width: 210 }
    }]);
  }

  function onConnect(connection: Connection) {
    setEdges((current) => addEdge({ ...connection, id: `edge-${Date.now()}` }, current));
  }

  return <div className="flow-layout">
    <section className="flow-library panel"><div className="panel-top"><strong>Nodes</strong><button className="icon-button" title="Add selected node" onClick={addSelectedNode}>＋</button></div>{nodeTypes.map(([type, description]) => <button key={type} className={selectedNode === type ? "node-type selected" : "node-type"} onClick={() => setSelectedNode(type)}><span className="node-icon">{type[0]}</span><span><strong>{type}</strong><small>{description}</small></span></button>)}</section>
    <section className="canvas panel"><div className="canvas-toolbar"><span className="draft-badge">{published ? "Published version" : "Editing draft"}</span><div><button className="ghost">↶</button><button className="ghost">↷</button><button className="primary" onClick={publishFlow}>{published ? "Published ✓" : "Publish"}</button></div></div>
      <div className="flow-canvas"><ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_event, node) => setSelectedNode(String(node.data.kind ?? "Message"))} fitView><Background gap={18} size={1} /><MiniMap pannable zoomable /><Controls /></ReactFlow></div>
    </section>
    <aside className="inspector panel"><p className="eyebrow">NODE INSPECTOR</p><h2>{selectedNode}</h2>{selectedNode === "Condition" ? <><label>Field<select defaultValue="phone"><option value="phone">Phone</option><option>Tag</option><option>Conversation status</option></select></label><label>Operator<select defaultValue="is"><option value="is">is</option><option>contains</option><option>exists</option></select></label><label>Value<input defaultValue="+628556551544" /></label><div className="branch"><span className="status-dot" /> Match → Send acknowledgement</div><div className="branch otherwise">○ Otherwise → End</div></> : <><label>Node name<input key={selectedNode} defaultValue={selectedNode === "Start" ? "Start" : `${selectedNode} #1`} /></label><label>Notes<textarea key={`notes-${selectedNode}`} placeholder="Add implementation notes…" rows={4} /></label><p className="muted">Settings are saved as a draft. Publishing creates an immutable version for live executions.</p></>}<button className="outline-button full">Save draft</button></aside>
  </div>;
}

function Contacts() { return <div className="single-view panel"><div className="panel-top"><div><p className="eyebrow">CRM</p><h2>Contacts</h2></div><button className="primary">New contact</button></div><label className="search wide"><span>⌕</span><input placeholder="Search name, email, or phone" /></label><table><thead><tr><th>Name</th><th>Channel</th><th>Phone</th><th>Last interaction</th><th>Status</th></tr></thead><tbody><tr><td><strong>Ardi Wirawan</strong></td><td>WhatsApp</td><td>+62 855 6551 544</td><td>Today</td><td><span className="pill green">Open</span></td></tr></tbody></table></div>; }

function Templates() { return <div className="single-view panel"><div className="panel-top"><div><p className="eyebrow">WHATSAPP</p><h2>Message templates</h2></div><div><button className="outline-button">Sync templates</button><button className="primary">New template</button></div></div><div className="template-card"><div><span className="pill purple">Marketing</span><h3>broadcast</h3><p>Hello {'{{name}}'}, this marketing broadcast…</p><small>English · last synced today</small></div><div><span className="pill green">Approved</span><button className="ghost">⋯</button></div></div><p className="muted">Templates are synchronized from WhatsApp. Send-time validation must require an approved template and every variable value.</p></div>; }

function Settings() { return <div className="settings-grid"><section className="single-view panel"><p className="eyebrow">CHANNEL HEALTH</p><h2>WhatsApp Cloud</h2><div className="health"><span className="status-dot" /><div><strong>Cloud API connected</strong><small>Coexistence mode · Wira Mart</small></div><span className="pill green">Available</span></div><dl><div><dt>Messaging limit</dt><dd>Tier 250</dd></div><div><dt>Quality</dt><dd>Green</dd></div><div><dt>Display name</dt><dd className="warning">Pending approval</dd></div><div><dt>Business verification</dt><dd className="warning">Limited</dd></div></dl></section><section className="single-view panel"><p className="eyebrow">VOICE</p><h2>Call settings</h2><label className="switch-row">Allow voice calls <input type="checkbox" /></label><label className="switch-row">Allow callbacks <input type="checkbox" /></label><label>Timezone<select defaultValue="jakarta"><option value="jakarta">Asia/Jakarta</option></select></label><p className="muted">Incoming calling and weekly availability are separate from message automation.</p></section></div>; }
