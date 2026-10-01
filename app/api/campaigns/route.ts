import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { campaignStore } from "@/lib/domain/memory-store";

const campaignSchema = z.object({ name: z.string().trim().min(1).max(160), templateId: z.string().min(1) });
export function GET() { return NextResponse.json({ campaigns: campaignStore.list() }); }
export async function POST(request: NextRequest) {
  const parsed = campaignSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid campaign" }, { status: 400 });
  try { return NextResponse.json({ campaign: campaignStore.create(parsed.data.name, parsed.data.templateId) }, { status: 201 }); }
  catch { return NextResponse.json({ error: "Approved template not found" }, { status: 422 }); }
}
