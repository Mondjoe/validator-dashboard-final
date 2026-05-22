"use client";

import { ThemeProvider } from "./providers/ThemeProvider";
import { CommandPalette } from "../components/CommandPalette";
import { ToastContainer } from "../components/ToastContainer";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "var(--charm-black)", color: "var(--text-primary)" }}>
        <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
          <CommandPalette />
          <ThemeProvider>{children}</ThemeProvider>
          <ToastContainer />
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
