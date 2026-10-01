import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { flowStore } from "@/lib/domain/memory-store";
import { simulateFlow } from "@/lib/automation/runner";

type RouteContext = { params: Promise<{ flowId: string }> };
const inputSchema = z.object({ keyword: z.string().trim().min(1).max(500), phone: z.string().optional(), attributes: z.record(z.string()).optional() });

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { flowId } = await params;
  const input = inputSchema.safeParse(await request.json().catch(() => null));
  if (!input.success) return NextResponse.json({ error: "Invalid simulation input" }, { status: 400 });
  const flow = flowStore.list().find((item) => item.id === flowId);
  if (!flow) return NextResponse.json({ error: "Flow not found" }, { status: 404 });
  return NextResponse.json({ result: simulateFlow(flow, input.data) });
}
