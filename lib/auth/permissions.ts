export const roles = ["owner", "admin", "manager", "agent", "analyst", "viewer"] as const;
export type WorkspaceRole = typeof roles[number];
export type Permission = "workspace.manage" | "channel.manage" | "contact.read" | "contact.write" | "inbox.reply" | "inbox.assign" | "flow.manage" | "campaign.manage" | "analytics.read" | "billing.manage";

const grants: Record<WorkspaceRole, Permission[]> = {
  owner: ["workspace.manage", "channel.manage", "contact.read", "contact.write", "inbox.reply", "inbox.assign", "flow.manage", "campaign.manage", "analytics.read", "billing.manage"],
  admin: ["workspace.manage", "channel.manage", "contact.read", "contact.write", "inbox.reply", "inbox.assign", "flow.manage", "campaign.manage", "analytics.read"],
  manager: ["contact.read", "contact.write", "inbox.reply", "inbox.assign", "flow.manage", "campaign.manage", "analytics.read"],
  agent: ["contact.read", "contact.write", "inbox.reply", "inbox.assign"],
  analyst: ["contact.read", "analytics.read"],
  viewer: ["contact.read"]
};

export function can(role: WorkspaceRole, permission: Permission) { return grants[role].includes(permission); }
export function permissionsFor(role: WorkspaceRole) { return [...grants[role]]; }
