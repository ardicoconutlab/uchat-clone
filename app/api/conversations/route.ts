import { NextRequest, NextResponse } from "next/server";
import { readWorkspaceId } from "@/lib/auth/workspace-context";
import { databaseConfigured } from "@/lib/db/tenant";
import { listConversations } from "@/lib/data/repository";

export async function GET(request: NextRequest) {
  const workspaceId = readWorkspaceId(request);
  if (databaseConfigured() && !workspaceId) return NextResponse.json({ error: "Workspace context is required" }, { status: 401 });
  return NextResponse.json({ conversations: await listConversations(workspaceId ?? undefined) });
}
