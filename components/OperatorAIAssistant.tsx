"use client";

import { useEffect, useState } from "react";

export function OperatorAIAssistant({ validator }: { validator: any }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(
        `/api/diagnose?chain=${validator.chain}&validator=${validator.id}`
      );
      const d = await res.json();
      setData(d);
    }

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [validator]);

  if (!data) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Operator AI Assistant</h3>
        <p>Analyzing...</p>
      </div>
    );
  }

  const color =
    data.level === "critical"
      ? "#ff3366"
      : data.level === "warning"
      ? "#ffaa00"
      : "#2affff";

  return (
    <div className="panel fade-in">
      <h3 className="neon">Operator AI Assistant</h3>

      <div style={{ color, fontSize: 16, marginBottom: 10 }}>
        Status: {data.level.toUpperCase()}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong style={{ color: "#2affff" }}>Issues:</strong>
        <ul>
          {data.issues.map((i: string, idx: number) => (
            <li key={idx} style={{ color: "#ccc" }}>{i}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong style={{ color: "#2affff" }}>Recommended Actions:</strong>
        <ul>
          {data.recommendations.map((r: string, idx: number) => (
            <li key={idx} style={{ color: "#ffaa00" }}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}