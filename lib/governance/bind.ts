import { buildCapsuleIdentity } from "@/lib/identity/capsule";

export function bindCapsuleToAction(identity: any, action: any) {
  const capsule = buildCapsuleIdentity(identity);

  return {
    capsuleFingerprint: capsule.fingerprint,
    identity: capsule.identity,
    action,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };
}
