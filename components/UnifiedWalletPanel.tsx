"use client";

import { useEffect, useState } from "react";
import { connectEvmWallet } from "@/lib/evm";
import { connectTron } from "@/lib/tron";
import { useTonAddress } from "@tonconnect/ui-react";
import { TonClient, Address } from "@ton/ton";

export function UnifiedWalletPanel() {
  const tonAddress = useTonAddress();

  const [evm, setEvm] = useState<any>(null);
  const [tron, setTron] = useState<any>(null);
  const [ton, setTon] = useState<any>(null);

  // Load EVM
  async function loadEvm() {
    try {
      const data = await connectEvmWallet();
      setEvm(data);
    } catch {}
  }

  // Load TRON
  async function loadTron() {
    try {
      const data = await connectTron();
      setTron(data);
    } catch {}
  }

  // Load TON
  async function loadTon() {
    if (!tonAddress) return;

    try {
      const client = new TonClient({
        endpoint: "https://toncenter.com/api/v2/jsonRPC",
      });

      const rawBalance = await client.getBalance(Address.parse(tonAddress));
      const tonBalance = Number(rawBalance) / 1e9;

      setTon({
        address: tonAddress,
        balance: tonBalance.toFixed(4),
        network: "mainnet",
      });
    } catch {}
  }

  useEffect(() => {
    loadEvm();
    loadTron();
    loadTon();
  }, [tonAddress]);

  return (
    <div className="p-6 border rounded-xl bg-black/40 mt-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Connected Wallets</h2>

      {/* EVM */}
      <div className="p-4 border rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold">EVM Wallet</h3>
        {evm ? (
          <div className="mt-2 text-sm space-y-1">
            <div><strong>Address:</strong> {evm.address}</div>
            <div><strong>Balance:</strong> {evm.balance} ETH</div>
            <div><strong>Network:</strong> {evm.network}</div>
          </div>
        ) : (
          <div className="text-gray-400">Not connected</div>
        )}
      </div>

      {/* TON */}
      <div className="p-4 border rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold">TON Wallet</h3>
        {ton ? (
          <div className="mt-2 text-sm space-y-1">
            <div><strong>Address:</strong> {ton.address}</div>
            <div><strong>Balance:</strong> {ton.balance} TON</div>
            <div><strong>Network:</strong> {ton.network}</div>
          </div>
        ) : (
          <div className="text-gray-400">Not connected</div>
        )}
      </div>

      {/* TRON */}
      <div className="p-4 border rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold">TRON Wallet</h3>
        {tron ? (
          <div className="mt-2 text-sm space-y-1">
            <div><strong>Address:</strong> {tron.address}</div>
            <div><strong>Balance:</strong> {tron.balance} TRX</div>
            <div><strong>Network:</strong> {tron.network}</div>
          </div>
        ) : (
          <div className="text-gray-400">Not connected</div>
        )}
      </div>
    </div>
  );
}