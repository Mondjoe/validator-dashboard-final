'use client'

import { useChainStatus } from "@/hooks/useChainStatus";

export default function ChainStatusPage() {
  const status = useChainStatus();

  const chains = [
    { name: "EVM (Ethereum)", key: "evm", color: "#00F5FF" },
    { name: "Solana", key: "solana", color: "#8B5CF6" },
    { name: "TON", key: "ton", color: "#2dd4bf" },
    { name: "TRON", key: "tron", color: "#facc15" },
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Chain Status</h1>
      <p className="text-white/50 text-sm mb-6">
        Live RPC health • Auto‑refresh every 10 seconds
      </p>

      <div className="space-y-4">
        {chains.map((c) => {
          const ping = status[c.key];

          return (
            <div
              key={c.key}
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${c.color}30`,
              }}
            >
              <div className="flex justify-between items-center">
                <div className="text-white font-bold" style={{ color: c.color }}>
                  {c.name}
                </div>

                <div className="text-xs font-mono text-white/70">
                  {ping === null ? (
                    <span className="text-red-400">Offline</span>
                  ) : (
                    <span className="text-green-400">{ping.toFixed(0)} ms</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
