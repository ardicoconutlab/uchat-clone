import { FlowDefinition, FlowNode } from "@/lib/domain/types";

export type FlowSimulationInput = { keyword: string; phone?: string; attributes?: Record<string, string>; split?: "a" | "b" };
export type FlowSimulationResult = { matched: boolean; completed: boolean; steps: Array<{ nodeId: string; type: string; outcome: string }> };

function outgoing(flow: FlowDefinition, nodeId: string, output?: string) {
  return flow.edges.find((edge) => edge.source === nodeId && (!output || edge.output === output))?.target;
}

function nextConditionOutput(node: FlowNode, input: FlowSimulationInput) {
  if (node.id === "condition_phone") return input.phone === "+628556551544" ? "match" : "otherwise";
  return "match";
}

/** Deterministic prototype interpreter for the supported graph-node family. */
export function simulateFlow(flow: FlowDefinition, input: FlowSimulationInput): FlowSimulationResult {
  const start = flow.nodes.find((node) => node.type === "Start");
  if (!start || !flow.trigger.toLowerCase().includes(input.keyword.toLowerCase())) return { matched: false, completed: true, steps: [] };
  const steps: FlowSimulationResult["steps"] = [];
  let currentId: string | undefined = start.id;
  let guard = 0;
  while (currentId && guard++ < 100) {
    const node = flow.nodes.find((item) => item.id === currentId);
    if (!node) return { matched: true, completed: false, steps: [...steps, { nodeId: currentId, type: "unknown", outcome: "missing_node" }] };
    if (node.type === "Condition") {
      const outcome = nextConditionOutput(node, input);
      steps.push({ nodeId: node.id, type: node.type, outcome });
      currentId = outgoing(flow, node.id, outcome);
      continue;
    }
    if (node.type === "Question") {
      steps.push({ nodeId: node.id, type: node.type, outcome: "waiting_for_response" });
      return { matched: true, completed: false, steps };
    }
    if (node.type === "Delay") {
      steps.push({ nodeId: node.id, type: node.type, outcome: "scheduled" });
      return { matched: true, completed: false, steps };
    }
    if (node.type === "Split") {
      const outcome = input.split ?? "a";
      steps.push({ nodeId: node.id, type: node.type, outcome });
      currentId = outgoing(flow, node.id, outcome) ?? outgoing(flow, node.id);
      continue;
    }
    steps.push({ nodeId: node.id, type: node.type, outcome: node.type === "Message" ? "message_queued" : node.type === "Action" ? "action_queued" : "completed" });
    currentId = outgoing(flow, node.id);
  }
  return { matched: true, completed: guard < 100, steps };
}
