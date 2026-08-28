import { buildCapsuleIdentity } from "@/lib/identity/capsule";

export function generateSessionKey(identity: any) {
  const capsule = buildCapsuleIdentity(identity);

  const seed = capsule.fingerprint + Date.now().toString();

  // Simple deterministic keypair generator
  const encoder = new TextEncoder();
  const data = encoder.encode(seed);

  const key = crypto.subtle.digest("SHA-256", data);

  return key.then((hash) => {
    const privateKey = Buffer.from(hash).toString("hex");
    const publicKey = crypto.randomUUID(); // pseudo public key

    return {
      publicKey,
      privateKey,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // 15 minutes
      fingerprint: capsule.fingerprint,
    };
  });
}
