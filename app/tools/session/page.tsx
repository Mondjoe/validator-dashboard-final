'use client'

import { useSessionSigner } from "@/hooks/useSessionSigner";
import { useState } from "react";

export default function SessionKeyPage() {
  const { sign } = useSessionSigner();
  const [output, setOutput] = useState(null);

  async function handleSign() {
    const result = await sign("Test session signing");
    setOutput(result);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Session Keys</h1>
      <p className="text-white/50 text-sm mb-6">
        Temporary operator keys • Capsule‑derived • Zero wallet popups
      </p>

      <button
        onClick={handleSign}
        className="px-4 py-2 rounded bg-green-600/40 hover:bg-green-600/60 text-white text-xs font-mono"
      >
        Generate & Sign with Session Key
      </button>

      {output && (
        <div className="mt-6 p-4 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70">
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
