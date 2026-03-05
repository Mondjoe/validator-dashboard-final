"use client";

import { JsonRpcProvider, Connection } from "@mysten/sui.js";
import { createContext, useContext } from "react";

const SuiContext = createContext<JsonRpcProvider | null>(null);

export function SuiProvider({ children }: { children: React.ReactNode }) {
  const provider = new JsonRpcProvider(
    new Connection({
      fullnode: "https://fullnode.mainnet.sui.io",
    })
  );

  return (
    <SuiContext.Provider value={provider}>
      {children}
    </SuiContext.Provider>
  );
}

export function useSui() {
  const ctx = useContext(SuiContext);
  if (!ctx) throw new Error("SuiProvider missing");
  return ctx;
}
