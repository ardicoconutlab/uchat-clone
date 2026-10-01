import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { whatsappWebhookConfigured } from "@/lib/channels/whatsapp/config";

export const runtime = "nodejs";

function validSignature(rawBody: string, signature: string | null) {
  const secret = process.env.META_APP_SECRET;
  if (!secret || !signature?.startsWith("sha256=")) return false;
  const expected = `sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  const actual = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

export function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams;
  if (!whatsappWebhookConfigured()) return NextResponse.json({ error: "WhatsApp webhook is not configured" }, { status: 503 });
  if (search.get("hub.mode") !== "subscribe" || search.get("hub.verify_token") !== process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 403 });
  }
  return new NextResponse(search.get("hub.challenge") ?? "", { status: 200, headers: { "Content-Type": "text/plain" } });
}

export async function POST(request: NextRequest) {
  if (!whatsappWebhookConfigured()) return NextResponse.json({ error: "WhatsApp webhook is not configured" }, { status: 503 });
  const rawBody = await request.text();
  if (!validSignature(rawBody, request.headers.get("x-hub-signature-256"))) return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  const payload: unknown = JSON.parse(rawBody);
  return NextResponse.json({ accepted: Boolean(payload) }, { status: 202 });
}
