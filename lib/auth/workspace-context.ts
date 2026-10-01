import { z } from "zod";

const workspaceIdSchema = z.string().uuid();

export function readWorkspaceId(request: Request) {
  const value = request.headers.get("x-convoflow-workspace-id");
  if (!value) return null;
  return workspaceIdSchema.safeParse(value).success ? value : null;
}

/**
 * Temporary bridge for the prototype routes. The production authentication
 * middleware will derive these IDs from an OIDC session and membership check,
 * never from caller-provided headers.
 */
export function readActorId(request: Request) {
  const value = request.headers.get("x-convoflow-actor-id");
  if (!value) return null;
  return workspaceIdSchema.safeParse(value).success ? value : null;
}
