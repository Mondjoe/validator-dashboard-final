'use client'

import { exportGovernanceState } from "@/lib/governance/export/export";
import { anchorSnapshot } from "@/lib/governance/anchor/anchor";
import { useIdentity } from "@/hooks/useIdentity";
import { useCapsuleSigner } from "@/hooks/useCapsuleSigner";
import { useState } from "react";

export default function AnchorPage() {
  const id = useIdentity();
  const { sign } = useCapsuleSigner();

  const [output, setOutput] = useState(null);

  async function handleAnchor() {
    const snapshot = exportGovernanceState();

    const result = await anchorSnapshot(snapshot, {
      evmConnected: id.evm?.isConnected,
      solanaConnected: id.solana?.isConnected,
      tonConnected: id.ton?.isConnected,
      tronConnected: id.tron?.isConnected,
      solWallet: null,
      tonUI: null,
    });

    setOutput(result);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Chain Anchoring</h1>
      <p className="text-white/50 text-sm mb-6">
        Anchor governance snapshots to blockchain • Tamper‑proof verification
      </p>

      <button
        onClick={handleAnchor}
        className="px-4 py-2 rounded bg-purple-600/40 hover:bg-purple-600/60 text-white text-xs font-mono"
      >
        Anchor Snapshot
      </button>

      {output && (
        <div className="mt-6 p-4 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70">
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
``