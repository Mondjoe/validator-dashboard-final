"use client";

import { useState } from "react";

export default function ENSLookup() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!input) return;

    setLoading(true);
    setResult("");

    try {
      const rpc = "https://eth.llamarpc.com";

      let method = "";
      let params: any[] = [];

      if (input.endsWith(".eth")) {
        // ENS name → address
        method = "eth_call";
        const namehash = await fetch(
          `https://api.ensideas.com/ens/resolve/${input}`
        ).then((r) => r.json());

        if (namehash?.address) {
          setResult(namehash.address);
        } else {
          setResult("Not found");
        }
      } else {
        // Address → ENS name
        const reverse = await fetch(
          `https://api.ensideas.com/ens/reverse/${input}`
        ).then((r) => r.json());

        if (reverse?.name) {
          setResult(reverse.name);
        } else {
          setResult("No ENS name found");
        }
      }
    } catch (err) {
      setResult("Lookup failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">ENS Lookup</h1>

      <div className="space-y-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ENS name or ETH address"
          className="bg-black border border-[#333] p-3 rounded w-full"
        />

        <button
          onClick={lookup}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Looking up..." : "Lookup"}
        </button>

        {result && (
          <div className="mt-6 bg-[#111] p-4 rounded border border-[#222]">
            <p className="text-lg break-all">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
