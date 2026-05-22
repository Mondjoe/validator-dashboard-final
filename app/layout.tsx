<<<<<<< HEAD
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
=======
import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import '../index.css'

export const metadata: Metadata = {
  title: 'Web3 NFT Dashboard',
  description: 'Cyberpunk Noir themed Web3 NFT Dashboard with Alchemy API integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster theme="dark" />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
>>>>>>> 97da0969c39273142c519581487bd3908b60a0c3
