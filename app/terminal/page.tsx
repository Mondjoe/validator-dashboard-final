"use client";

import { useState } from "react";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Page() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: injected(),
  });

  const { data: ethBalance } = useBalance({
    address,
    chainId: 1,
    enabled: isConnected,
  });

  const runCommand = async (cmd: string) => {
    const lower = cmd.toLowerCase();

    // HELP
    if (lower === "help") {
      return `
Available commands:
help, clear, identity, chains, status,
eth, rpc, network eth,
wallet, wallet connect eth, wallet disconnect,
wallet address eth, wallet balance eth
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

    // ETH CHAIN INFO
    if (lower === "eth") {
      return `
Ethereum Mainnet:
Chain ID: 1
RPC: https://eth.llamarpc.com
Status: Online
`;
    }

    // RPC LIST
    if (lower === "rpc") {
      return `
RPC Endpoints:
ETH → https://eth.llamarpc.com
`;
    }

    // NETWORK ETH
    if (lower === "network eth") {
      return `
Ethereum Network:
Chain ID: 1
Status: Online
`;
    }

    // WALLET ROOT
    if (lower === "wallet") {
      return `
Wallet Module:
Status: ${isConnected ? "Connected" : "Not connected"}
Address: ${address ?? "—"}
`;
    }

    // WALLET CONNECT ETH
    if (lower === "wallet connect eth") {
      try {
        await connect();
        return `
ETH Wallet Connected:
Address: ${address ?? "(fetching...)"}
`;
      } catch {
        return "Wallet Connect Error: No injected wallet found.";
      }
    }

    // WALLET DISCONNECT
    if (lower === "wallet disconnect") {
      disconnect();
      return "Wallet disconnected successfully.";
    }

    // WALLET ADDRESS ETH
    if (lower === "wallet address eth") {
      return `
ETH Wallet Address:
${address ?? "Not connected"}
`;
    }

    // WALLET BALANCE ETH
    if (lower === "wallet balance eth") {
      if (!isConnected) return "Wallet not connected.";
      return `
ETH Balance:
${ethBalance?.formatted ?? "Loading..."} ETH
`;
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