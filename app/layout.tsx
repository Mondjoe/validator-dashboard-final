"use client";

import { ThemeProvider } from "./providers/ThemeProvider";
import { CommandPalette } from "../components/CommandPalette";
import { ToastContainer } from "../components/ToastContainer";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { WagmiProvider } from "wagmi";
import { config } from "../lib/wagmiConfig";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "var(--charm-black)", color: "var(--text-primary)" }}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
              <CommandPalette />
              <ThemeProvider>{children}</ThemeProvider>
              <ToastContainer />
            </TonConnectUIProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
