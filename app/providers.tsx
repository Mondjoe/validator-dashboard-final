"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./providers/evm-provider";

import { SolanaProvider } from "./providers/solana-provider";
import { TonProvider } from "./providers/ton-provider";
import { TronProvider } from "./providers/tron-provider";
import { SuiProvider } from "./providers/sui-provider";
import { BTCProvider } from "./providers/btc-provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SolanaProvider>
          <TonProvider>
            <TronProvider>
              <SuiProvider>
                <BTCProvider>
                  {children}
                </BTCProvider>
              </SuiProvider>
            </TronProvider>
          </TonProvider>
        </SolanaProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
