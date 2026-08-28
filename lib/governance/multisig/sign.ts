import { capsuleSign } from "@/lib/capsule/sign";
import { buildCapsuleIdentity } from "@/lib/identity/capsule";

export async function signMultiSig(identity: any, request: any, ctx: any) {
  const capsule = buildCapsuleIdentity(identity);

  const signature = await capsuleSign(
    identity,
    JSON.stringify(request.action),
    ctx
  );

  return {
    signerFingerprint: capsule.fingerprint,
    signature,
    timestamp: new Date().toISOString(),
  };
}
