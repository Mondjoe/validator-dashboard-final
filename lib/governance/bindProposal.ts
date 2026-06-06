import { buildCapsuleIdentity } from "@/lib/identity/capsule";

export function bindProposal(identity: any, proposal: any) {
  const capsule = buildCapsuleIdentity(identity);

  return {
    capsuleFingerprint: capsule.fingerprint,
    identity: capsule.identity,
    proposal,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };
}
