export type WhatsAppInboundEvent =
  | { kind: "message"; providerEventId: string; providerMessageId: string; phoneNumberId: string; from: string; timestamp: string; text: string | null; raw: unknown }
  | { kind: "status"; providerEventId: string; providerMessageId: string; phoneNumberId: string; recipientId: string; timestamp: string; status: string; raw: unknown };

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;
const asArray = (value: unknown) => Array.isArray(value) ? value : [];
const textOf = (value: unknown) => isRecord(value) && isRecord(value.text) && typeof value.text.body === "string" ? value.text.body : null;

/** Converts only the supported Meta webhook shapes into provider-independent facts. */
export function normalizeWhatsAppWebhook(payload: unknown): WhatsAppInboundEvent[] {
  if (!isRecord(payload)) return [];
  const events: WhatsAppInboundEvent[] = [];
  for (const entry of asArray(payload.entry)) {
    if (!isRecord(entry)) continue;
    for (const change of asArray(entry.changes)) {
      if (!isRecord(change) || !isRecord(change.value)) continue;
      const value = change.value;
      const phoneNumberId = isRecord(value.metadata) && typeof value.metadata.phone_number_id === "string" ? value.metadata.phone_number_id : "";
      for (const message of asArray(value.messages)) {
        if (!isRecord(message) || typeof message.id !== "string" || typeof message.from !== "string" || typeof message.timestamp !== "string") continue;
        events.push({ kind: "message", providerEventId: message.id, providerMessageId: message.id, phoneNumberId, from: message.from, timestamp: message.timestamp, text: textOf(message), raw: message });
      }
      for (const status of asArray(value.statuses)) {
        if (!isRecord(status) || typeof status.id !== "string" || typeof status.recipient_id !== "string" || typeof status.timestamp !== "string" || typeof status.status !== "string") continue;
        events.push({ kind: "status", providerEventId: `${status.id}:${status.status}:${status.timestamp}`, providerMessageId: status.id, phoneNumberId, recipientId: status.recipient_id, timestamp: status.timestamp, status: status.status, raw: status });
      }
    }
  }
  return events;
}
