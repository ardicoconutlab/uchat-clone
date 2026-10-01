import { NextResponse } from "next/server";
import { databaseConfigured } from "@/lib/db/tenant";
import { whatsappSendingConfigured, whatsappWebhookConfigured } from "@/lib/channels/whatsapp/config";

export function GET() {
  return NextResponse.json({ status: "ok", service: "convoflow", database: databaseConfigured() ? "configured" : "not_configured", whatsapp: { webhook: whatsappWebhookConfigured() ? "configured" : "not_configured", sending: whatsappSendingConfigured() ? "configured" : "not_configured" }, timestamp: new Date().toISOString() });
}
