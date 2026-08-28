"use client";

import { useState } from "react";

export function SnapshotManager({ validator }: { validator: any }) {
  const [output, setOutput] = useState("");

  async function run(action: string) {
    if (!validator) return;

    setOutput("Running...");

    const res = await fetch("/api/snapshot", {
      method: "POST",
      body: JSON.stringify({
        chain: validator.chain,
        action,
      }),
    });

    const data = await res.json();
    setOutput(data.output || data.error);
  }

  return (
    <div className="panel fade-in">
      <h3 className="neon">Node Snapshot Manager</h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          onClick={() => run("backup")}
          className="btn-neon"
        >
          Backup
        </button>

        <button
          onClick={() => run("restore")}
          className="btn-neon"
        >
          Restore
        </button>

        <button
          onClick={() => run("prune")}
          className="btn-neon"
        >
          Prune
        </button>
      </div>

      <pre style={{ fontSize: 12, color: "#ccc" }}>{output}</pre>
    </div>
  );
}