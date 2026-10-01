import { whatsappSendingConfigured } from "./config";

export class WhatsAppConfigurationError extends Error {}
export class WhatsAppDeliveryError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

export async function sendWhatsAppText(input: { to: string; body: string }) {
  const accessToken = process.env.META_WABA_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
  const apiVersion = process.env.META_GRAPH_API_VERSION;
  if (!whatsappSendingConfigured() || !accessToken || !phoneNumberId || !apiVersion) {
    throw new WhatsAppConfigurationError("WhatsApp sending is not configured");
  }

  const response = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: input.to, type: "text", text: { preview_url: false, body: input.body } })
  });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = typeof payload === "object" && payload && "error" in payload ? JSON.stringify((payload as { error: unknown }).error) : "WhatsApp send failed";
    throw new WhatsAppDeliveryError(detail, response.status);
  }
  return payload;
}
