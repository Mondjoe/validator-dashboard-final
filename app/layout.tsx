import "./globals.css";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import { SolanaProvider } from "./providers/solana-provider";

export const metadata = {
  title: "Operator Dashboard",
  description: "Validator, Wallet, Multichain, Liquidity, Identity, DAO Governance",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex">
        <SolanaProvider>
          <Sidebar />

          <main className="flex-1 ml-64 px-6 py-6 space-y-8">
            {children}
          </main>
        </SolanaProvider>
      </body>
    </html>
  );
}