'use client'

import { useProposal } from "@/hooks/useProposal";
import { useState } from "react";

export default function ProposalPage() {
  const { createAndSign } = useProposal();
  const [output, setOutput] = useState(null);

  async function handleSign() {
    const result = await createAndSign({
      title: "Test Proposal",
      description: "This is a capsule‑signed proposal",
      actions: [
        { type: "LOG", message: "Hello governance" }
      ]
    });

    setOutput(result);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Proposal Signing</h1>
      <p className="text-white/50 text-sm mb-6">
        Capsule‑bound proposals • Multi‑chain signatures • Sovereign governance
      </p>

      <button
        onClick={handleSign}
        className="px-4 py-2 rounded bg-purple-600/40 hover:bg-purple-600/60 text-white text-xs font-mono"
      >
        Create & Sign Proposal
      </button>

      {output && (
        <div className="mt-6 p-4 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70">
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
