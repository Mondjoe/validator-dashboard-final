import { buildCapsuleIdentity } from "@/lib/identity/capsule";
import { signEvm } from "@/lib/signers/evm";
import { signSolana } from "@/lib/signers/solana";
import { signTon } from "@/lib/signers/ton";
import { signTron } from "@/lib/signers/tron";

export async function capsuleSign(id: any, message: string, ctx: any) {
  const capsule = buildCapsuleIdentity(id);

  let chain = null;
  let signature = null;

  if (id.evm.isConnected) {
    chain = "evm";
    signature = await signEvm(message);
  } else if (id.solana.isConnected) {
    chain = "solana";
    signature = await signSolana(ctx.solWallet, message);
  } else if (id.ton.isConnected) {
    chain = "ton";
    signature = await signTon(ctx.tonUI, message);
  } else if (id.tron.isConnected) {
    chain = "tron";
    signature = await signTron(message);
  } else {
    throw new Error("No connected wallet available for signing");
  }

  return {
    chain,
    signature,
    fingerprint: capsule.fingerprint,
    timestamp: new Date().toISOString(),
    message,
  };
}
