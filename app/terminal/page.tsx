"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const runCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();

    // HELP
    if (lower === "help") {
      return `
Available commands:
help, clear, identity, chains, status,
eth, ton, solana, sui,
rpc, balance <chain>, network <chain>,
wallet, wallet chains, wallet info,
wallet address <chain>, wallet balance <chain>,
wallet connect, wallet disconnect
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

    // STATUS
    if (lower === "status") {
      return "System Status: All modules online. No incidents.";
    }

    // ETH
    if (lower === "eth") {
      return `
Ethereum Mainnet:
Chain ID: 1
RPC: https://eth.llamarpc.com
Status: Online
`;
    }

    // TON
    if (lower === "ton") {
      return `
TON Network:
Chain: TON Mainnet
RPC: https://toncenter.com/api/v2/jsonRPC
Status: Online
`;
    }

    // SOLANA
    if (lower === "solana") {
      return `
Solana Mainnet:
Cluster: mainnet-beta
RPC: https://api.mainnet-beta.solana.com
Status: Online
`;
    }

    // SUI
    if (lower === "sui") {
      return `
Sui Network:
Chain: Sui Mainnet
RPC: https://fullnode.mainnet.sui.io
Status: Online
`;
    }

    // RPC LIST
    if (lower === "rpc") {
      return `
RPC Endpoints:
ETH → https://eth.llamarpc.com
TON → https://toncenter.com/api/v2/jsonRPC
SOLANA → https://api.mainnet-beta.solana.com
SUI → https://fullnode.mainnet.sui.io
`;
    }

    // BALANCE <chain>
    if (lower.startsWith("balance ")) {
      const chain = lower.split(" ")[1];
      return `Balance check for ${chain}: (placeholder — connect wallet module)`;
    }

    // NETWORK <chain>
    if (lower.startsWith("network ")) {
      const chain = lower.split(" ")[1];
      return `Network status for ${chain}: Online (placeholder — connect chain health API)`;
    }

    // WALLET ROOT
    if (lower === "wallet") {
      return `
Wallet Module:
Status: Not connected
Use: wallet connect
`;
    }

    // WALLET CHAINS
    if (lower === "wallet chains") {
      return `
Supported Wallet Chains:
ETH, TON, SOLANA, SUI
`;
    }

    // WALLET INFO
    if (lower === "wallet info") {
      return `
Wallet Info:
Status: Not connected
Address: —
Chains: ETH, TON, SOLANA, SUI
`;
    }

    // WALLET ADDRESS <chain>
    if (lower.startsWith("wallet address ")) {
      const chain = lower.split(" ")[2];
      return `Wallet address for ${chain}: (placeholder — integrate wallet adapter)`;
    }

    // WALLET BALANCE <chain>
    if (lower.startsWith("wallet balance ")) {
      const chain = lower.split(" ")[2];
      return `Wallet balance for ${chain}: (placeholder — integrate wallet balance API)`;
    }

    // WALLET CONNECT
    if (lower === "wallet connect") {
      return `
Wallet Connect:
(placeholder — integrate wagmi, tonconnect, solana adapter, sui wallet)
`;
    }

    // WALLET DISCONNECT
    if (lower === "wallet disconnect") {
      return `
Wallet Disconnect:
Wallet disconnected successfully.
`;
    }

    return `Unknown command: ${cmd}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = runCommand(input.trim());
    if (output !== "") {
      setHistory((prev) => [...prev, `> ${input}`, output]);
    } else {
      setHistory((prev) => [...prev, `> ${input}`]);
    }

    setInput("");
  };

  return (
    <div className="p-6 text-white">
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