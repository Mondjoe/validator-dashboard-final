"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const runCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      return "Available commands: help, clear, identity, chains, status";
    }

    if (lower === "clear") {
      setHistory([]);
      return "";
    }

    if (lower === "identity") {
      return "Operator Identity: CharmCapsule → Charm Operator → Mondjoe → Triopath → Heinhtat → Mr.j";
    }

    if (lower === "chains") {
      return "Active Chains: Ethereum, TON, Solana, Sui";
    }

    if (lower === "status") {
      return "System Status: All modules online. No incidents.";
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
          <div key={i} className="text-gray-300 mb-1">
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