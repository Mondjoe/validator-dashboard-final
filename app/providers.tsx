"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  mainnet,
  bsc,
  optimism,
  base,
  arbitrum,
  polygon,
  scroll,
} from "wagmi/chains";

const config = createConfig({
  chains: [mainnet, bsc, optimism, base, arbitrum, polygon, scroll],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
    [scroll.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
