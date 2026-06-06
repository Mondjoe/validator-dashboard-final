import { useWallet } from "@solana/wallet-adapter-react";

export async function signSolana(wallet: any, message: string) {
  const encoded = new TextEncoder().encode(message);
  const signature = await wallet.signMessage(encoded);
  return Buffer.from(signature).toString("base64");
}
