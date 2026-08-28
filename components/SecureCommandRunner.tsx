"use client";

import { useState } from "react";

export function SecureCommandRunner({ validator }: { validator: any }) {
  const [cmd, setCmd] = useState("");
  const [out, setOut] = useState("");

  async function run() {
    if (!validator) return;

    const res = await fetch("/api/secure-run", {
      method: "POST",
      body: JSON.stringify({
        chain: validator.chain,
        command: cmd,
      }),
    });

    const data = await res.json();
    setOut(data.output || data.error);
  }

  return (
    <div className="panel fade-in">
      <h3 className="neon">Secure Command Runner</h3>

      <input
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        placeholder="Enter whitelisted command key..."
        style={{
          width: "100%",
          padding: "10px",
          background: "#08080b",
          border: "1px solid #1f1f28",
          borderRadius: 6,
          color: "#2affff",
          marginBottom: 10,
        }}
      />

      <button
        onClick={run}
        style={{
          padding: "8px 14px",
          background: "#0c0c10",
          border: "1px solid #2affff",
          color: "#2affff",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Run
      </button>

      <pre style={{ marginTop: 20, fontSize: 12, color: "#ccc" }}>{out}</pre>
    </div>
  );
}