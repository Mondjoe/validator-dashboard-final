"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export default function Page() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // Solana wallet hooks
  const { connection } = useConnection();
  const { publicKey, connected, connect, disconnect } = useWallet();

  const getSolBalance = async () => {
    if (!publicKey) return null;
    const lamports = await connection.getBalance(publicKey);
    return lamports / 1_000_000_000; // SOL
  };

  const runCommand = async (cmd: string) => {
    const lower = cmd.toLowerCase();

    // HELP
    if (lower === "help") {
      return `
Available commands:
wallet connect solana, wallet address solana,
wallet balance solana, wallet disconnect,
solana
`;
    }

    // SOLANA CHAIN INFO
    if (lower === "solana") {
      return `
Solana Mainnet:
Cluster: mainnet-beta
RPC: https://api.mainnet-beta.solana.com
Status: Online
`;
    }

    // WALLET CONNECT SOLANA
    if (lower === "wallet connect solana") {
      try {
        await connect();
        return `
Solana Wallet Connected:
Address: ${publicKey?.toBase58() ?? "(fetching...)"}
`;
      } catch {
        return "Solana Connect Error: No wallet found.";
      }
    }

    // WALLET ADDRESS SOLANA
    if (lower === "wallet address solana") {
      return `
Solana Wallet Address:
${publicKey?.toBase58() ?? "Not connected"}
`;
    }

    // WALLET BALANCE SOLANA
    if (lower === "wallet balance solana") {
      if (!connected) return "Solana wallet not connected.";
      const sol = await getSolBalance();
      return `
Solana Balance:
${sol} SOL
`;
    }

    // WALLET DISCONNECT
    if (lower === "wallet disconnect") {
      disconnect();
      return "Wallet disconnected successfully.";
    }

    return `Unknown command: ${cmd}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = await runCommand(input.trim());
    setHistory((prev) => [...prev, `> ${input}`, output]);
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