"use client";

import { createContext, useContext } from "react";

const BTCContext = createContext<string | null>(null);

export function BTCProvider({ children }: { children: React.ReactNode }) {
  // Public Bitcoin mainnet RPC endpoint (read-only)
  const endpoint = "https://btc.getblock.io/mainnet/";

  return (
    <BTCContext.Provider value={endpoint}>
      {children}
    </BTCContext.Provider>
  );
}

export function useBTC() {
  const ctx = useContext(BTCContext);
  if (!ctx) throw new Error("BTCProvider missing");
  return ctx;
}
