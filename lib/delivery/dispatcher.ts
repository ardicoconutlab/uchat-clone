import { sendWhatsAppText } from "@/lib/channels/whatsapp/client";
import { canDispatch, type DeliveryGuardInput } from "./guard";

export type OutboundTextIntent = { id: string; to: string; body: string; guard: DeliveryGuardInput };
export type DispatchResult = { intentId: string; status: "blocked" | "accepted" | "failed"; reason?: string; providerPayload?: unknown };

/**
 * Worker-facing boundary for outbound delivery. Persistence of the intent state
 * surrounds this function in the PostgreSQL outbox worker.
 */
export async function dispatchOutboundText(intent: OutboundTextIntent): Promise<DispatchResult> {
  const decision = canDispatch(intent.guard);
  if (!decision.allowed) return { intentId: intent.id, status: "blocked", reason: decision.reason };
  try {
    const providerPayload = await sendWhatsAppText({ to: intent.to, body: intent.body });
    return { intentId: intent.id, status: "accepted", providerPayload };
  } catch (error) {
    return { intentId: intent.id, status: "failed", reason: error instanceof Error ? error.message : "Provider delivery failed" };
  }
}
