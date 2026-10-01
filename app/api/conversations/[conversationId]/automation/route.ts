import { NextRequest, NextResponse } from "next/server";
import { readWorkspaceId } from "@/lib/auth/workspace-context";
import { databaseConfigured } from "@/lib/db/tenant";
import { setAutomationPaused } from "@/lib/data/repository";

type RouteContext = { params: Promise<{ conversationId: string }> };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { conversationId } = await params;
  const workspaceId = readWorkspaceId(request);
  if (databaseConfigured() && !workspaceId) return NextResponse.json({ error: "Workspace context is required" }, { status: 401 });
  const payload: unknown = await request.json().catch(() => null);
  const paused = typeof payload === "object" && payload && "paused" in payload ? (payload as { paused?: unknown }).paused : undefined;

  if (typeof paused !== "boolean") return NextResponse.json({ error: "paused must be a boolean" }, { status: 400 });

  try {
    return NextResponse.json({ conversation: await setAutomationPaused(conversationId, paused, workspaceId ?? undefined) });
  } catch {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }
}
