import { hashSnapshot } from "./hashSnapshot";
import { anchorToEvm } from "./evm";
import { anchorToSolana } from "./solana";
import { anchorToTon } from "./ton";
import { anchorToTron } from "./tron";

export async function anchorSnapshot(snapshot: any, ctx: any) {
  const hash = await hashSnapshot(snapshot);

  if (ctx.evmConnected) {
    return { chain: "evm", hash, tx: await anchorToEvm(hash) };
  }

  if (ctx.solanaConnected) {
    return { chain: "solana", hash, tx: await anchorToSolana(ctx.solWallet, hash) };
  }

  if (ctx.tonConnected) {
    return { chain: "ton", hash, tx: await anchorToTon(ctx.tonUI, hash) };
  }

  if (ctx.tronConnected) {
    return { chain: "tron", hash, tx: await anchorToTron(hash) };
  }

  throw new Error("No connected chain available for anchoring");
}
