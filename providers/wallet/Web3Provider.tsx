"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

interface WalletContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: string | null;
  connect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  provider: null,
  signer: null,
  address: null,
  connect: async () => {},
});

export const useWallet = () => useContext(WalletContext);

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  // Detect Rabby, MetaMask, Trust Wallet (mobile)
  const detectProvider = () => {
    if (typeof window === "undefined") return null;

    // Rabby first (your main desktop wallet)
    if ((window as any).rabby) return (window as any).rabby;

    // MetaMask fallback
    if ((window as any).ethereum) return (window as any).ethereum;

    return null;
  };

  const connect = async () => {
    const injected = detectProvider();
    if (!injected) {
      alert("No wallet detected. Open Trust Wallet on mobile or install Rabby.");
      return;
    }

    const ethProvider = new ethers.BrowserProvider(injected);
    setProvider(ethProvider);

    const signer = await ethProvider.getSigner();
    setSigner(signer);

    const addr = await signer.getAddress();
    setAddress(addr);
  };

  // Auto-connect if wallet already authorized
  useEffect(() => {
    const injected = detectProvider();
    if (!injected) return;

    injected.request({ method: "eth_accounts" }).then((accounts: string[]) => {
      if (accounts.length > 0) connect();
    });
  }, []);

  return (
    <WalletContext.Provider value={{ provider, signer, address, connect }}>
      {children}
    </WalletContext.Provider>
  );
}
