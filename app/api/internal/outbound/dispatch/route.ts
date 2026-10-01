import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dispatchOutboundText } from "@/lib/delivery/dispatcher";

const schema = z.object({ id: z.string().min(1), to: z.string().min(6), body: z.string().min(1).max(4096), guard: z.object({ automationPaused: z.boolean(), optedIn: z.boolean(), withinServiceWindow: z.boolean(), approvedTemplate: z.boolean(), isTemplateSend: z.boolean() }) });

export async function POST(request: NextRequest) {
  const secret = process.env.INTERNAL_DISPATCH_SECRET;
  if (!secret) return NextResponse.json({ error: "Dispatcher is not configured" }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = schema.safeParse(await request.json().catch(() => null));
  if (!input.success) return NextResponse.json({ error: "Invalid outbound intent" }, { status: 400 });
  return NextResponse.json({ result: await dispatchOutboundText(input.data) });
}
