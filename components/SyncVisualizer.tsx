"use client";

import { useEffect, useState } from "react";

export function SyncVisualizer({ validator }: { validator: any }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(`/api/sync?chain=${validator.chain}`);
      const d = await res.json();
      setData(d);
    }

    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, [validator]);

  if (!data) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Multi‑Node Sync</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Multi‑Node Sync</h3>
        <p style={{ color: "#ff3366" }}>{data.error}</p>
      </div>
    );
  }

  return (
    <div className="panel fade-in">
      <h3 className="neon">Multi‑Node Sync</h3>

      <div style={{ marginTop: 10 }}>
        {data.nodes.map((n: any, i: number) => (
          <div
            key={i}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #1f1f28",
              fontSize: 14
            }}
          >
            <div style={{ color: "#2affff" }}>
              {n.id.toUpperCase()} — {n.ok ? "Online" : "Offline"}
            </div>

            {n.ok && (
              <>
                <div style={{ color: "#ccc" }}>
                  Height: {n.height.toLocaleString()}
                </div>
                <div
                  style={{
                    color: n.lag === 0 ? "#2affff" : n.lag < 5 ? "#ffaa00" : "#ff3366"
                  }}
                >
                  Lag: {n.lag}
                </div>
              </>
            )}

            {!n.ok && (
              <div style={{ color: "#ff3366" }}>Node unreachable</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}