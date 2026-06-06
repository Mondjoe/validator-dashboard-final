import { buildCapsuleIdentity } from "@/lib/identity/capsule";

export function bindDelegation(identity: any, grant: any) {
  const capsule = buildCapsuleIdentity(identity);

  return {
    capsuleFingerprint: capsule.fingerprint,
    identity: capsule.identity,
    grant,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };
}
