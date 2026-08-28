"use client";

import { useEffect, useState } from "react";

export function LogsStream() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const ev = new EventSource("/api/logs");

    ev.onmessage = (e) => {
      setLines((prev) => [...prev.slice(-200), e.data]);
    };

    return () => ev.close();
  }, []);

  return (
    <div className="panel" style={{ height: 300, overflowY: "auto" }}>
      <h3>Real‑time Logs</h3>
      <pre style={{ fontSize: 12 }}>
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </pre>
    </div>
  );
}