import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";

export async function anchorToSolana(wallet: any, hash: string) {
  const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

  const tx = new Transaction().add({
    keys: [],
    programId: memoProgram,
    data: Buffer.from(hash),
  });

  return await wallet.sendTransaction(tx, wallet.connection);
}
