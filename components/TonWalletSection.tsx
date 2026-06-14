"use client";

import { TonConnectButton, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { TonClient, Address } from "@ton/ton";
import { useEffect, useState } from "react";

export function TonWalletSection() {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const [balance, setBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  useEffect(() => {
    async function loadTonData() {
      if (!address) return;

      try {
        // TON RPC endpoint (public)
        const client = new TonClient({
          endpoint: "https://toncenter.com/api/v2/jsonRPC"
        });

        // Fetch balance
        const rawBalance = await client.getBalance(Address.parse(address));
        const ton = Number(rawBalance) / 1e9; // convert nanotons → TON
        setBalance(ton.toFixed(4));

        // Detect network
        const net = tonConnectUI?.connector?.wallet?.device?.platform;
        setNetwork(net || "mainnet");
      } catch (err) {
        console.error("TON fetch error:", err);
      }
    }

    loadTonData();
  }, [address, tonConnectUI]);

  return (
    <div className="p-4 border rounded-lg bg-black/40 mt-4">
      <h2 className="text-xl mb-2">TON Wallet</h2>

      <TonConnectButton />
   <div>
  <h3 className="text-lg font-semibold mb-2 text-blue-400">EVM</h3>
  <div className="bg-[#111] p-3 rounded border border-blue-500/20 text-gray-400 text-sm">
    EVM wallet support coming soon
  </div>
</div>

      {address && (
        <div className="mt-3 text-sm space-y-1">
          <div><strong>Address:</strong> {address}</div>
          <div><strong>Balance:</strong> {balance ? `${balance} TON` : "Loading..."}</div>
          <div><strong>Network:</strong> {network || "mainnet"}</div>
        </div>
      )}
    </div>
  );
}
