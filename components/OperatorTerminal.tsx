"use client";

import { useState } from "react";

export function OperatorTerminal() {
  const [cmd, setCmd] = useState("");
  const [out, setOut] = useState("");

  async function run() {
    const res = await fetch("/api/terminal", {
      method: "POST",
      body: JSON.stringify({ command: cmd }),
    });

    const data = await res.json();
    setOut(data.output);
  }

  return (
    <div className="panel">
      <h3>Operator Terminal</h3>

      <input
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        placeholder="Enter command..."
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={run}>Run</button>

      <pre style={{ marginTop: 20, fontSize: 12 }}>{out}</pre>
    </div>
  );
}