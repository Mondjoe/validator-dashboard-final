"use client";
import { useState } from "react";

export default function Dashboard() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("ethereum");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchWallet() {
    setLoading(true);
    setData(null);

    const res = await fetch(
      `/api/wallet?address=${address}&chain=${chain}`
    );

    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Charm Capsule – Multi‑Chain Wallet Dashboard</h1>

      <input
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "400px", padding: "10px", marginTop: "20px" }}
      />

      {/* ⭐ FIXED SELECT — only ONE */}
      <select
        value={chain}
        onChange={(e) => setChain(e.target.value)}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        <option value="ethereum">ethereum</option>
        <option value="solana">solana</option>
        <option value="bnb">bnb</option>
        <option value="polygon">polygon</option>
        <option value="arbitrum">arbitrum</option>
        <option value="optimism">optimism</option>
        <option value="avalanche">avalanche</option>
        <option value="base">base</option>
        <option value="scroll">scroll</option>
        <option value="zksync">zksync</option>
        <option value="ton">ton</option>
        <option value="tron">tron</option>
        <option value="sui">sui</option>
        <option value="bitcoin">bitcoin</option>
        <option value="sui">sui</option>
        <option value="aptos">aptos</option>
      </select>

      {/* ⭐ FIXED BUTTON — correct opening tag */}
      <button
        onClick={fetchWallet}
        style={{
          display: "block",
          marginTop: "20px",
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Fetch Wallet Data
      </button>

      {loading && <p style={{ marginTop: "20px" }}>Loading...</p>}

      {data && (
        <pre style={{ marginTop: "20px", background: "#111", padding: "20px", color: "white" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
