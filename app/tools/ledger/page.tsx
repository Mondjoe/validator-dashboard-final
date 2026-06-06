'use client'

import { useLedger } from "@/hooks/useLedger";

export default function LedgerPage() {
  const { entries } = useLedger();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Governance Ledger</h1>
      <p className="text-white/50 text-sm mb-6">
        Immutable audit trail • Capsule‑bound • Append‑only
      </p>

      <div className="space-y-4">
        {entries.map((entry, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,245,255,0.1)",
            }}
          >
            <div className="text-xs text-white/40 mb-2">
              {entry.timestamp} • {entry.type}
            </div>

            <pre className="text-xs text-white/70 font-mono whitespace-pre-wrap">
{JSON.stringify(entry, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
