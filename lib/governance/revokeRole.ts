import { resolveRole } from "./resolveRole";
import { roleBindings } from "./roleBindings";

export function revokeRole(granterIdentity: any, targetFingerprint: string) {
  const granterRole = resolveRole(granterIdentity);

  if (granterRole !== "owner") {
    throw new Error("Only OWNER can revoke roles");
  }

  delete roleBindings[targetFingerprint];

  return {
    granterRole,
    targetFingerprint,
    revoked: true,
    timestamp: new Date().toISOString(),
  };
}
