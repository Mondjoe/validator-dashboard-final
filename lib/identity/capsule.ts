import { normalizeIdentity } from "./normalize";
import { generateIdentityFingerprint } from "./fingerprint";

export function buildCapsuleIdentity(id: any) {
  const normalized = normalizeIdentity(id);

  return {
    identity: normalized,
    fingerprint: generateIdentityFingerprint(normalized),
    generatedAt: new Date().toISOString(),
    version: "1.0.0",
  };
}
