import { bindCapsuleToAction } from "./bind";
import { sessionSign } from "@/lib/capsule/session/sign";

export async function sessionAuthorize(identity: any, action: any) {
  const bound = bindCapsuleToAction(identity, action);
  const signed = await sessionSign(identity, JSON.stringify(bound));

  return {
    ...bound,
    sessionSignature: signed.signature,
    session: signed.session,
  };
}
