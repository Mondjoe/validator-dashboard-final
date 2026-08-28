"use client";

import { useAccount, useChainId } from "wagmi";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

export function useIdentity() {
  // -----------------------------
  // EVM
  // -----------------------------
  const evm = useAccount();
  const evmChain = useChainId();

  // -----------------------------
  // Solana
  // -----------------------------
  const sol = useSolanaWallet();
  const solAddress = sol.publicKey?.toBase58() || null;

  // -----------------------------
  // TON
  // -----------------------------
  const [tonUI] = useTonConnectUI();
  const tonAddress = tonUI?.account?.address || null;

  // -----------------------------
  // TRON
  // -----------------------------
  const [tronAddress, setTronAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).tronWeb) {
      const tw = (window as any).tronWeb;

      const check = setInterval(() => {
        if (tw.defaultAddress?.base58) {
          setTronAddress(tw.defaultAddress.base58);
          clearInterval(check);
        }
      }, 500);

      return () => clearInterval(check);
    }
  }, []);

  // -----------------------------
  // UNIFIED IDENTITY OBJECT
  // -----------------------------
  return {
    evm: {
      address: evm.address || null,
      chainId: evmChain || null,
      isConnected: evm.isConnected,
    },

    solana: {
      address: solAddress,
      isConnected: !!solAddress,
    },

    ton: {
      address: tonAddress,
      isConnected: !!tonAddress,
    },

    tron: {
      address: tronAddress,
      isConnected: !!tronAddress,
    },
  };
}
