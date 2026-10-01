export type DeliveryGuardInput = { automationPaused: boolean; optedIn: boolean; withinServiceWindow: boolean; approvedTemplate: boolean; isTemplateSend: boolean };
export type DeliveryGuardResult = { allowed: boolean; reason?: "automation_paused" | "no_consent" | "outside_service_window" | "template_not_approved" };

/** Shared worker/API rule set before any outbound provider call is attempted. */
export function canDispatch(input: DeliveryGuardInput): DeliveryGuardResult {
  if (input.automationPaused) return { allowed: false, reason: "automation_paused" };
  if (!input.optedIn) return { allowed: false, reason: "no_consent" };
  if (!input.withinServiceWindow && !input.isTemplateSend) return { allowed: false, reason: "outside_service_window" };
  if (input.isTemplateSend && !input.approvedTemplate) return { allowed: false, reason: "template_not_approved" };
  return { allowed: true };
}
