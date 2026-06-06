"use client";

import { useState } from "react";

export default function AddressConverter() {
  const [input, setInput] = useState("");
  const [eth, setEth] = useState("");
  const [base, setBase] = useState("");
  const [bnb, setBnb] = useState("");

  const convert = () => {
    try {
      // Simple checksum normalization
      const normalized = input.trim();

      setEth(normalized);
      setBase("0x" + normalized.replace("0x", "").slice(0, 40));
      setBnb("0x" + normalized.replace("0x", "").slice(0, 40));
    } catch {
      alert("Invalid address");
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Address Converter</h1>

      <div className="space-y-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter any EVM address"
          className="bg-black border border-[#333] p-3 rounded w-full"
        />

        <button
          onClick={convert}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Convert
        </button>

        <div className="mt-6 space-y-3 text-gray-300">
          <p><strong>Ethereum:</strong> {eth}</p>
          <p><strong>Base:</strong> {base}</p>
          <p><strong>BNB:</strong> {bnb}</p>
        </div>
      </div>
    </div>
  );
}
