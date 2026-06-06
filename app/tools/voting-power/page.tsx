"use client";

import { useState } from "react";

export default function VotingPowerCalculator() {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");
  const [block, setBlock] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    if (!address || !token) {
      alert("Address and token contract are required");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const rpc = "https://eth.llamarpc.com";

      // ERC20 balanceOf(address)
      const data =
        "0x70a08231" + // function selector
        address.replace("0x", "").padStart(64, "0");

      const response = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_call",
          params: [
            {
              to: token,
              data,
            },
            block ? "0x" + Number(block).toString(16) : "latest",
          ],
        }),
      });

      const json = await response.json();
      const hex = json.result;

      if (!hex) {
        setResult("Error: No response from RPC");
      } else {
        const value = parseInt(hex, 16);
        setResult(value.toLocaleString());
      }
    } catch (err) {
      setResult("Failed to calculate voting power");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Voting Power Calculator</h1>

      <div className="space-y-4">

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Wallet Address"
          className="bg-black border border-[#333] p-3 rounded w-full"
        />

        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ERC20 Token Contract"
          className="bg-black border border-[#333] p-3 rounded w-full"
        />

        <input
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          placeholder="Block Number (optional)"
          className="bg-black border border-[#333] p-3 rounded w-full"
        />

        <button
          onClick={calculate}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Calculating..." : "Calculate Voting Power"}
        </button>

        {result && (
          <div className="mt-6 bg-[#111] p-4 rounded border border-[#222]">
            <p className="text-lg">
              <strong>Voting Power:</strong> {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
