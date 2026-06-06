"use client";

import { useState } from "react";

export default function ProposalFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatProposal = () => {
    if (!input.trim()) return;

    const formatted = `
# 🏛 Governance Proposal

## Summary
${input.trim()}

## Motivation
Explain why this proposal is needed and what problem it solves.

## Specification
Describe the exact changes, parameters, or actions.

## Rationale
Why this approach? Why now?

## Risks & Considerations
List any risks, dependencies, or trade‑offs.

## Implementation
Who executes it? What steps? What timeline?

## Voting Options
- **For** — Approve the proposal  
- **Against** — Reject the proposal  
- **Abstain** — No opinion  
`;

    setOutput(formatted);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard");
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Proposal Formatter</h1>

      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your raw proposal text here..."
          className="bg-black border border-[#333] p-3 rounded w-full h-40"
        />

        <button
          onClick={formatProposal}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Format Proposal
        </button>

        {output && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Formatted Output</h2>

            <textarea
              value={output}
              readOnly
              className="bg-[#111] border border-[#222] p-4 rounded w-full h-80 text-gray-300"
            />

            <button
              onClick={copyToClipboard}
              className="mt-3 px-6 py-3 bg-green-600 rounded hover:bg-green-700 transition"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
