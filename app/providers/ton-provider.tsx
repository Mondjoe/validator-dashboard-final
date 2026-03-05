"use client";

import { TonClient, TonClient4 } from "@ton/ton";
import { createContext, useContext } from "react";

const TonContext = createContext<TonClient | null>(null);

export function TonProvider({ children }: { children: React.ReactNode }) {
  const client = new TonClient4({
    endpoint: "https://toncenter.com/api/v2/jsonRPC",
  });

  return (
    <TonContext.Provider value={client}>
      {children}
    </TonContext.Provider>
  );
}

export function useTon() {
  const ctx = useContext(TonContext);
  if (!ctx) throw new Error("TonProvider missing");
  return ctx;
}
