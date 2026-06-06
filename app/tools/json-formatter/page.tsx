"use client";

import { useState } from "react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard");
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">JSON Formatter</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SIDE — INPUT */}
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw JSON here..."
            className="bg-black border border-[#333] p-3 rounded w-full h-80"
          />

          <button
            onClick={formatJSON}
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Format JSON
          </button>

          {error && (
            <p className="text-red-400 text-sm">
              <strong>Error:</strong> {error}
            </p>
          )}
        </div>

        {/* RIGHT SIDE — OUTPUT */}
        <div>
          {output && (
            <>
              <h2 className="text-xl font-semibold mb-3">Formatted JSON</h2>

              <textarea
                value={output}
                readOnly
                className="bg-[#111] border border-[#222] p-4 rounded w-full h-80 text-gray-300"
              />

              <button
                onClick={copy}
                className="mt-3 px-6 py-3 bg-green-600 rounded hover:bg-green-700 transition"
              >
                Copy to Clipboard
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
