"use client";

import { useIdentity } from "./useIdentity";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { capsuleSign } from "@/lib/capsule/sign";

export function useCapsuleSigner() {
  const id = useIdentity();
  const solWallet = useSolanaWallet();
  const [tonUI] = useTonConnectUI();

  async function sign(message: string) {
    return await capsuleSign(id, message, { solWallet, tonUI });
  }

  return { sign };
}
