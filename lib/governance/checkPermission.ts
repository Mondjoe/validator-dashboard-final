import { resolveRole } from "./resolveRole";
import { Permissions } from "./permissions";

export function hasPermission(identity: any, action: string) {
  const role = resolveRole(identity);
  if (!role) return false;

  const allowed = Permissions[action];
  if (!allowed) return false;

  return allowed.includes(role);
}
