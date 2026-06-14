"use client";

import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

export default function WalletDrawer({ open, onClose }: any) {
  const sol = useSolanaWallet();

  // TRON state
  const [tronAddress, setTronAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).tronWeb) {
      const tw = (window as any).tronWeb;

      const check = setInterval(() => {
        if (tw.defaultAddress?.base58) {
          setTronAddress(tw.defaultAddress.base58);
          clearInterval(check);
        }
      }, 500);

      return () => clearInterval(check);
    }
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-[#0a0a0f] border-l border-blue-500/30 shadow-xl shadow-blue-500/20 transform transition-all duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 space-y-8 text-white">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-400">Wallets</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

 {/* Solana */}
<div>
  <h3 className="text-lg font-semibold mb-2 text-purple-400">Solana</h3>
  <div className="bg-[#111] p-3 rounded border border-purple-500/20 text-gray-400 text-sm">
    Solana wallet support coming soon
  </div>
</div>

        {/* TON */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-cyan-400">TON</h3>
          <div className="bg-[#111] p-3 rounded border border-cyan-500/20">
            <TonConnectButton />
          </div>
        </div>

        {/* TRON */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">TRON</h3>

          <button
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).tronWeb) {
                const tw = (window as any).tronWeb;
                if (tw.defaultAddress?.base58) {
                  setTronAddress(tw.defaultAddress.base58);
                  alert("TronLink connected");
                } else {
                  alert("Open TronLink and refresh");
                }
              } else {
                alert("TronLink not detected");
              }
            }}
            className="w-full bg-yellow-600 hover:bg-yellow-700 p-3 rounded transition"
          >
            TronLink
          </button>

          {tronAddress && (
            <div className="mt-2 text-sm text-yellow-300 break-all">
              Connected: {tronAddress}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
