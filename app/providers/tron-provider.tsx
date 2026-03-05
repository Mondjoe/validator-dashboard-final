"use client";

import TronWeb from "tronweb";
import { createContext, useContext } from "react";

const TronContext = createContext<TronWeb | null>(null);

export function TronProvider({ children }: { children: React.ReactNode }) {
  const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io",
  });

  return (
    <TronContext.Provider value={tronWeb}>
      {children}
    </TronContext.Provider>
  );
}

export function useTron() {
  const ctx = useContext(TronContext);
  if (!ctx) throw new Error("TronProvider missing");
  return ctx;
}
