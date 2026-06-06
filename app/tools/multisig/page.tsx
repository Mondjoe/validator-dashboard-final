'use client'

import { useMultiSig } from "@/hooks/useMultiSig";
import { createMultiSigRequest } from "@/lib/governance/multisig/request";
import { useState } from "react";

export default function MultiSigPage() {
  const { approve, execute } = useMultiSig();
  const [request, setRequest] = useState<any>(null);
  const [output, setOutput] = useState(null);

  function createRequest() {
    const req = createMultiSigRequest({
      action: { type: "UPGRADE_SYSTEM", version: "2.0" },
      requiredSigners: ["fingerprintA", "fingerprintB"], // example
    });

    setRequest(req);
  }

  async function handleApprove() {
    const updated = await approve(request);
    setRequest({ ...updated });
  }

  function handleExecute() {
    try {
      const result = execute(request);
      setOutput(result);
    } catch (err: any) {
      setOutput({ error: err.message });
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Multi‑Sig</h1>
      <p className="text-white/50 text-sm mb-6">
        Multi‑identity approval • Threshold signatures • Sovereign consensus
      </p>

      <button
        onClick={createRequest}
        className="px-4 py-2 rounded bg-blue-600/40 hover:bg-blue-600/60 text-white text-xs font-mono mb-4"
      >
        Create Multi‑Sig Request
      </button>

      {request && (
        <>
          <button
            onClick={handleApprove}
            className="px-4 py-2 rounded bg-purple-600/40 hover:bg-purple-600/60 text-white text-xs font-mono mb-4"
          >
            Approve
          </button>

          <button
            onClick={handleExecute}
            className="px-4 py-2 rounded bg-green-600/40 hover:bg-green-600/60 text-white text-xs font-mono"
          >
            Execute
          </button>
        </>
      )}

      {output && (
        <div className="mt-6 p-4 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70">
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
