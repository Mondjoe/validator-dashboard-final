"use client";

import { Connection, clusterApiUrl } from "@solana/web3.js";
import { createContext, useContext } from "react";

const SolanaContext = createContext<Connection | null>(null);

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

  return (
    <SolanaContext.Provider value={connection}>
      {children}
    </SolanaContext.Provider>
  );
}

export function useSolana() {
  const ctx = useContext(SolanaContext);
  if (!ctx) throw new Error("SolanaProvider missing");
  return ctx;
}
