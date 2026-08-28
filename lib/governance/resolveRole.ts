import { roleBindings } from "./roleBindings";
import { buildCapsuleIdentity } from "@/lib/identity/capsule";

export function resolveRole(identity: any) {
  const capsule = buildCapsuleIdentity(identity);
  return roleBindings[capsule.fingerprint] || null;
}
