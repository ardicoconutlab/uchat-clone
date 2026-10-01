import { FlowDefinition, FlowValidationIssue, FlowNodeType } from "@/lib/domain/types";

const nodeTypes = new Set<FlowNodeType>(["Start", "Message", "Question", "Condition", "Action", "Delay", "Split"]);

export function validateFlowForPublish(flow: FlowDefinition): FlowValidationIssue[] {
  const issues: FlowValidationIssue[] = [];
  const nodeIds = new Set<string>();
  const starts = flow.nodes.filter((node) => node.type === "Start");

  for (const node of flow.nodes) {
    if (!nodeTypes.has(node.type)) issues.push({ code: "unsupported_node", message: `Unsupported node type: ${node.type}`, nodeId: node.id });
    if (!node.id.trim()) issues.push({ code: "missing_node_id", message: "Every node needs a stable ID." });
    if (nodeIds.has(node.id)) issues.push({ code: "duplicate_node_id", message: `Duplicate node ID: ${node.id}`, nodeId: node.id });
    nodeIds.add(node.id);
    if (!node.label.trim()) issues.push({ code: "missing_node_label", message: "Every node needs a label.", nodeId: node.id });
  }

  if (starts.length !== 1) issues.push({ code: "start_count", message: "A published flow must contain exactly one Start node." });

  for (const edge of flow.edges) {
    if (!nodeIds.has(edge.source)) issues.push({ code: "unknown_edge_source", message: `Edge source does not exist: ${edge.source}` });
    if (!nodeIds.has(edge.target)) issues.push({ code: "unknown_edge_target", message: `Edge target does not exist: ${edge.target}` });
  }

  const start = starts[0];
  if (start && flow.nodes.length > 1 && !flow.edges.some((edge) => edge.source === start.id)) {
    issues.push({ code: "start_has_no_path", message: "The Start node must have an outgoing path.", nodeId: start.id });
  }

  if (start) {
    const reachable = new Set<string>([start.id]);
    const queue = [start.id];
    while (queue.length) {
      const source = queue.shift()!;
      for (const edge of flow.edges.filter((item) => item.source === source)) {
        if (!reachable.has(edge.target)) {
          reachable.add(edge.target);
          queue.push(edge.target);
        }
      }
    }
    for (const node of flow.nodes) {
      if (!reachable.has(node.id)) issues.push({ code: "unreachable_node", message: "This node is not reachable from Start.", nodeId: node.id });
    }
  }

  return issues;
}
