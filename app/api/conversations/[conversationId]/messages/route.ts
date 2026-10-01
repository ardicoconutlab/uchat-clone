import { NextRequest, NextResponse } from "next/server";
import { readWorkspaceId } from "@/lib/auth/workspace-context";
import { databaseConfigured } from "@/lib/db/tenant";
import { addAgentMessage, listMessages } from "@/lib/data/repository";

type RouteContext = { params: Promise<{ conversationId: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { conversationId } = await params;
  const workspaceId = readWorkspaceId(_request);
  if (databaseConfigured() && !workspaceId) return NextResponse.json({ error: "Workspace context is required" }, { status: 401 });
  try {
    return NextResponse.json({ messages: await listMessages(conversationId, workspaceId ?? undefined) });
  } catch {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { conversationId } = await params;
  const workspaceId = readWorkspaceId(request);
  if (databaseConfigured() && !workspaceId) return NextResponse.json({ error: "Workspace context is required" }, { status: 401 });
  const payload: unknown = await request.json().catch(() => null);
  const body = typeof payload === "object" && payload && "body" in payload ? (payload as { body?: unknown }).body : undefined;

  if (typeof body !== "string" || body.trim().length === 0 || body.trim().length > 4096) {
    return NextResponse.json({ error: "body must contain 1 to 4096 characters" }, { status: 400 });
  }

  try {
    const message = await addAgentMessage(conversationId, body.trim(), workspaceId ?? undefined);
    return NextResponse.json({ message }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }
}
