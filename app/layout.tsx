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
