export type MessageDirection = "in" | "out" | "bot";

export type ConversationMessage = {
  id: string;
  conversationId: string;
  direction: MessageDirection;
  body: string;
  at: string;
  label?: string;
};

export type Conversation = {
  id: string;
  contactId: string;
  contactName: string;
  phone: string;
  channel: "whatsapp";
  status: "open" | "closed";
  automationPaused: boolean;
  assignedAgentId: string | null;
  preview: string;
  updatedAt: string;
};

export type FlowDefinition = {
  id: string;
  name: string;
  status: "draft" | "published";
  version: number;
  trigger: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
};

export type FlowNodeType = "Start" | "Message" | "Question" | "Condition" | "Action" | "Delay" | "Split";

export type FlowNode = {
  id: string;
  type: FlowNodeType;
  label: string;
};

export type FlowEdge = {
  source: string;
  target: string;
  output?: string;
};

export type FlowValidationIssue = {
  code: string;
  message: string;
  nodeId?: string;
};

export type MessageTemplate = { id: string; name: string; language: string; category: "authentication" | "marketing" | "utility"; status: "approved" | "pending" | "rejected"; body: string; variables: string[]; syncedAt: string };
export type Campaign = { id: string; name: string; templateId: string; status: "draft" | "scheduled" | "running" | "completed"; audienceCount: number; scheduledAt: string | null };
export type Contact = { id: string; name: string; phone: string; email: string | null; tags: string[]; consent: "opted_in" | "unknown" | "opted_out"; createdAt: string };
