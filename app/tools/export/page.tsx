'use client'

import { exportGovernanceState } from "@/lib/governance/export/export";
import { downloadSnapshot } from "@/lib/governance/export/download";
import { useState } from "react";

export default function ExportGovernancePage() {
  const [snapshot, setSnapshot] = useState(null);

  function handleExport() {
    const snap = exportGovernanceState();
    setSnapshot(snap);
  }

  function handleDownload() {
    if (snapshot) downloadSnapshot(snapshot);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Governance Export</h1>
      <p className="text-white/50 text-sm mb-6">
        Full system snapshot • Sovereign governance capsule • Portable & verifiable
      </p>

      <button
        onClick={handleExport}
        className="px-4 py-2 rounded bg-blue-600/40 hover:bg-blue-600/60 text-white text-xs font-mono mb-4"
      >
        Generate Snapshot
      </button>

      {snapshot && (
        <>
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded bg-green-600/40 hover:bg-green-600/60 text-white text-xs font-mono mb-6"
          >
            Download Snapshot
          </button>

          <div className="rounded-xl p-4 bg-white/5 border border-white/10 text-xs font-mono text-white/70">
            <pre>{JSON.stringify(snapshot, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}
