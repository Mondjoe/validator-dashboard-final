"use client";

import { useState } from "react";

export default function ABIViewer() {
  const [input, setInput] = useState("");
  const [abi, setAbi] = useState<any[]>([]);
  const [error, setError] = useState("");

  const parseABI = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);

      if (!Array.isArray(parsed)) {
        setError("ABI must be a JSON array");
        return;
      }

      setAbi(parsed);
    } catch (err: any) {
      setError(err.message);
      setAbi([]);
    }
  };

  const formatSignature = (item: any) => {
    if (!item.inputs) return item.name + "()";
    const params = item.inputs.map((i: any) => i.type).join(", ");
    return `${item.name}(${params})`;
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">ABI Viewer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SIDE — INPUT */}
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste ABI JSON here..."
            className="bg-black border border-[#333] p-3 rounded w-full h-80"
          />

          <button
            onClick={parseABI}
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Load ABI
          </button>

          {error && (
            <p className="text-red-400 text-sm">
              <strong>Error:</strong> {error}
            </p>
          )}
        </div>

        {/* RIGHT SIDE — OUTPUT */}
        <div className="space-y-6">

          {/* FUNCTIONS */}
          <div className="bg-[#111] p-4 rounded border border-[#222]">
            <h2 className="text-xl font-semibold mb-3">Functions</h2>
            <ul className="space-y-2 text-gray-300">
              {abi
                .filter((i) => i.type === "function")
                .map((fn, idx) => (
                  <li key={idx}>
                    <strong>{formatSignature(fn)}</strong>
                    <br />
                    <span className="text-gray-500 text-sm">
                      stateMutability: {fn.stateMutability}
                    </span>
                  </li>
                ))}
              {abi.filter((i) => i.type === "function").length === 0 && (
                <p className="text-gray-500">No functions found</p>
              )}
            </ul>
          </div>

          {/* EVENTS */}
          <div className="bg-[#111] p-4 rounded border border-[#222]">
            <h2 className="text-xl font-semibold mb-3">Events</h2>
            <ul className="space-y-2 text-gray-300">
              {abi
                .filter((i) => i.type === "event")
                .map((ev, idx) => (
                  <li key={idx}>
                    <strong>{formatSignature(ev)}</strong>
                  </li>
                ))}
              {abi.filter((i) => i.type === "event").length === 0 && (
                <p className="text-gray-500">No events found</p>
              )}
            </ul>
          </div>

          {/* ERRORS */}
          <div className="bg-[#111] p-4 rounded border border-[#222]">
            <h2 className="text-xl font-semibold mb-3">Errors</h2>
            <ul className="space-y-2 text-gray-300">
              {abi
                .filter((i) => i.type === "error")
                .map((er, idx) => (
                  <li key={idx}>
                    <strong>{formatSignature(er)}</strong>
                  </li>
                ))}
              {abi.filter((i) => i.type === "error").length === 0 && (
                <p className="text-gray-500">No errors found</p>
              )}
            </ul>
          </div>

          {/* CONSTRUCTOR */}
          <div className="bg-[#111] p-4 rounded border border-[#222]">
            <h2 className="text-xl font-semibold mb-3">Constructor</h2>
            {abi.find((i) => i.type === "constructor") ? (
              <p className="text-gray-300">
                {formatSignature(abi.find((i) => i.type === "constructor"))}
              </p>
            ) : (
              <p className="text-gray-500">No constructor</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
