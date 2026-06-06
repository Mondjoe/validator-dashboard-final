import { createHash } from "crypto";

export function generateIdentityFingerprint(identity: any) {
  const hash = createHash("sha256");

  hash.update(identity.evm || "");
  hash.update(identity.solana || "");
  hash.update(identity.ton || "");
  hash.update(identity.tron || "");

  return hash.digest("hex");
}
