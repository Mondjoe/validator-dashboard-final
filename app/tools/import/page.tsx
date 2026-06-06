'use client'

import { restoreGovernanceState } from "@/lib/governance/import/restore";
import { useState } from "react";

export default function ImportGovernancePage() {
  const [result, setResult] = useState(null);

  function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const snapshot = JSON.parse(reader.result as string);
        const res = restoreGovernanceState(snapshot);
        setResult(res);
      } catch (err: any) {
        setResult({ error: err.message });
      }
    };

    reader.readAsText(file);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Governance Import</h1>
      <p className="text-white/50 text-sm mb-6">
        Restore full governance state • Sovereign capsule import
      </p>

      <input
        type="file"
        accept="application/json"
        className="mb-4 text-white"
        onChange={handleFile}
      />

      {result && (
        <div className="rounded-xl p-4 bg-white/5 border border-white/10 text-xs font-mono text-white/70">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
