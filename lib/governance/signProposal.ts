import { bindProposal } from "./bindProposal";
import { capsuleSign } from "@/lib/capsule/sign";

export async function signProposal(identity: any, proposal: any, ctx: any) {
  const bound = bindProposal(identity, proposal);

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
