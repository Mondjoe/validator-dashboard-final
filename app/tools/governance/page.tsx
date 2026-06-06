'use client'

import { useGovernance } from "@/hooks/useGovernance";
import { useState } from "react";

export default function GovernancePage() {
  const { authorize } = useGovernance();
  const [output, setOutput] = useState(null);

  async function handleAuthorize() {
    const result = await authorize({
      type: "TEST_ACTION",
      message: "Hello governance",
    });

    setOutput(result);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Governance Module</h1>
      <p className="text-white/50 text-sm mb-6">
        Capsule‑bound identity • Signed actions • Sovereign authority
      </p>

      <button
        onClick={handleAuthorize}
        className="px-4 py-2 rounded bg-blue-600/40 hover:bg-blue-600/60 text-white text-xs font-mono"
      >
        Test Governance Authorization
      </button>

      {output && (
        <div className="mt-6 p-4 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70">
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
