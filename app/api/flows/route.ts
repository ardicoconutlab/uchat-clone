import { NextRequest, NextResponse } from "next/server";
import { FlowPublishError, flowStore } from "@/lib/domain/memory-store";
import { readWorkspaceId } from "@/lib/auth/workspace-context";
import { databaseConfigured } from "@/lib/db/tenant";
import { listFlows } from "@/lib/data/repository";

export async function GET(request: NextRequest) {
  const workspaceId = readWorkspaceId(request);
  if (databaseConfigured() && !workspaceId) return NextResponse.json({ error: "Workspace context is required" }, { status: 401 });
  return NextResponse.json({ flows: await listFlows(workspaceId ?? undefined) });
}

export async function POST(request: NextRequest) {
  const payload: unknown = await request.json().catch(() => null);
  const flowId = typeof payload === "object" && payload && "flowId" in payload ? (payload as { flowId?: unknown }).flowId : undefined;

  if (typeof flowId !== "string") return NextResponse.json({ error: "flowId is required" }, { status: 400 });

  try {
    return NextResponse.json({ flow: flowStore.publish(flowId) });
  } catch (error) {
    if (error instanceof FlowPublishError) return NextResponse.json({ error: error.message, issues: error.issues }, { status: 422 });
    return NextResponse.json({ error: "Flow not found" }, { status: 404 });
  }
}
