"use client";

import { WalletProvider } from "@mysten/wallet-kit";

export function SuiProvider({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}