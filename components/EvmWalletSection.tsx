"use client";

import { useState } from "react";
import { connectEvmWallet } from "@/lib/evm";

export function EvmWalletSection() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect() {
    try {
      const data = await connectEvmWallet();
      setAddress(data.address);
      setChainId(data.chainId);
      setNetwork(data.network);
      setBalance(data.balance);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-black/40 mt-4">
      <h2 className="text-xl mb-2">EVM Wallet</h2>

      <button
        onClick={handleConnect}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Connect EVM Wallet
      </button>

      {error && <div className="mt-2 text-red-400">{error}</div>}

      {address && (
        <div className="mt-3 text-sm space-y-1">
          <div><strong>Address:</strong> {address}</div>
          <div><strong>Balance:</strong> {balance} ETH</div>
          <div><strong>Chain ID:</strong> {chainId}</div>
          <div><strong>Network:</strong> {network}</div>
        </div>
      )}
    </div>
  );
}