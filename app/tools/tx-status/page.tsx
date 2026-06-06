"use client";

import { useState } from "react";

export default function TxStatusChecker() {
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!hash) return;

    setLoading(true);
    setStatus("");

    try {
      // Public Ethereum RPC (no API key needed)
      const rpc = "https://eth.llamarpc.com";

      const response = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getTransactionReceipt",
          params: [hash]
        })
      });

      const data = await response.json();
      const receipt = data.result;

      if (!receipt) {
        setStatus("⏳ Pending or not found");
      } else if (receipt.status === "0x1") {
        setStatus("✅ Success");
      } else if (receipt.status === "0x0") {
        setStatus("❌ Failed / Reverted");
      } else {
        setStatus("⚠️ Unknown status");
      }

    } catch (err) {
      setStatus("Error checking transaction");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Transaction Status Checker</h1>

      <div className="space-y-4">
        <input
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="Enter transaction hash"
          className="bg-black border border-[#333] p-3 rounded w-full"
        />

        <button
          onClick={checkStatus}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>

        {status && (
          <div className="mt-6 text-xl font-semibold">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
