import { NextResponse } from "next/server";
import { permissionsFor } from "@/lib/auth/permissions";

/** Prototype session shape; OIDC middleware will replace this fixture. */
export function GET() {
  const role = "owner" as const;
  return NextResponse.json({ user: { id: "demo-owner", name: "Workspace owner" }, workspace: { id: "demo", name: "Coco Workspace" }, role, permissions: permissionsFor(role) });
}
