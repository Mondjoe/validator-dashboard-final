import { resolveRole } from "./resolveRole";
import { Escalation } from "./escalation";
import { roleBindings } from "./roleBindings";

export function assignRole(granterIdentity: any, targetFingerprint: string, newRole: string) {
  const granterRole = resolveRole(granterIdentity);

  if (!granterRole) {
    throw new Error("Granter has no role");
  }

  const allowed = Escalation[granterRole];
  if (!allowed.includes(newRole)) {
    throw new Error(`Role ${granterRole} cannot assign ${newRole}`);
  }

  roleBindings[targetFingerprint] = newRole;

  return {
    granterRole,
    targetFingerprint,
    newRole,
    timestamp: new Date().toISOString(),
  };
}
