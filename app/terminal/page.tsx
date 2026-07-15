"use client";

import { useState } from "react";
import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";

export default function Page() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // TON Connect
  const [tonConnectUI] = useTonConnectUI();

  const tonAddress =
    tonConnectUI.account?.address ?? null;

  const tonBalance =
    tonConnectUI.account?.balance ?? null;

  const isTonConnected =
    tonConnectUI.account !== null;

  const runCommand = async (cmd: string) => {
    const lower = cmd.toLowerCase();

    // HELP
    if (lower === "help") {
      return `
Available commands:
help, clear, identity, chains, status,
eth, ton, solana, sui,
rpc, balance <chain>, network <chain>,
wallet, wallet chains, wallet info,
wallet connect eth, wallet connect ton,
wallet address eth, wallet address ton,
wallet balance eth, wallet balance ton,
wallet disconnect
`;
    }

    // CLEAR
    if (lower === "clear") {
      setHistory([]);
      return "";
    }

    // IDENTITY
    if (lower === "identity") {
      return "Operator Identity: CharmCapsule → Charm Operator → Mondjoe → Triopath → Heinhtat → Mr.j";
    }

    // CHAINS
    if (lower === "chains") {
      return "Active Chains: Ethereum, TON, Solana, Sui";
    }

    // TON CHAIN INFO
    if (lower === "ton") {
      return `
TON Network:
Chain: TON Mainnet
RPC: https://toncenter.com/api/v2/jsonRPC
Status: Online
`;
    }

    // WALLET ROOT
    if (lower === "wallet") {
      return `
Wallet Module:
ETH Connected: —
TON Connected: ${isTonConnected ? "Yes" : "No"}
TON Address: ${tonAddress ?? "—"}
`;
    }

    // WALLET CONNECT TON
    if (lower === "wallet connect ton") {
      try {
        await tonConnectUI.connectWallet();
        return `
TON Wallet Connected:
Address: ${tonAddress ?? "(fetching...)"}
`;
      } catch {
        return "TON Connect Error: No TON wallet found.";
      }
    }

    // WALLET ADDRESS TON
    if (lower === "wallet address ton") {
      return `
TON Wallet Address:
${tonAddress ?? "Not connected"}
`;
    }

    // WALLET BALANCE TON
    if (lower === "wallet balance ton") {
      if (!isTonConnected) return "TON wallet not connected.";
      return `
TON Balance:
${tonBalance ?? "Loading..."} TON
`;
    }

    // WALLET DISCONNECT
    if (lower === "wallet disconnect") {
      tonConnectUI.disconnect();
      return "Wallet disconnected successfully.";
    }

    return `Unknown command: ${cmd}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = await runCommand(input.trim());
    if (output !== "") {
      setHistory((prev) => [...prev, `> ${input}`, output]);
    } else {
      setHistory((prev) => [...prev, `> ${input}`]);
    }

    setInput("");
  };

  return (
    <div className="p-6 text-white">
      <TonConnectUI />

      <h1 className="text-2xl font-bold mb-4">Operator Terminal</h1>

      <div className="border border-gray-700 rounded-lg p-4 h-[500px] overflow-y-auto bg-black/40">
        {history.map((line, i) => (
          <div key={i} className="text-gray-300 whitespace-pre-line mb-1">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black border border-gray-700 rounded px-3 py-2 text-white"
          placeholder="Type a command…"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
        >
          Run
        </button>
      </form>
    </div>
  );
}