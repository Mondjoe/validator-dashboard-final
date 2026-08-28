"use client";

import { useState } from "react";
import { connectTron } from "@/lib/tron";

export function TronWalletSection() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect() {
    try {
      const data = await connectTron();
      if (!data) return;

      setAddress(data.address);
      setBalance(data.balance);
      setNetwork(data.network);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-black/40 mt-4">
      <h2 className="text-xl mb-2">TRON Wallet</h2>

      <button
        onClick={handleConnect}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Connect TronLink
      </button>

      {error && <div className="mt-2 text-red-400">{error}</div>}

      {address && (
        <div className="mt-3 text-sm space-y-1">
          <div><strong>Address:</strong> {address}</div>
          <div><strong>Balance:</strong> {balance} TRX</div>
          <div><strong>Network:</strong> {network}</div>
        </div>
      )}
    </div>
  );
}