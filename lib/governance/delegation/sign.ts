import { bindDelegation } from "./bind";
import { capsuleSign } from "@/lib/capsule/sign";

export async function signDelegation(identity: any, grant: any, ctx: any) {
  const bound = bindDelegation(identity, grant);

  const signature = await capsuleSign(
    identity,
    JSON.stringify(bound),
    ctx
  );

  return {
    ...bound,
    signature,
  };
}
