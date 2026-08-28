"use client";

import { useEffect, useState } from "react";

export function OperatorAlerts({ validator }: { validator: any }) {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(
        `/api/alerts?validator=${validator.id}&chain=${validator.chain}`
      );
      const data = await res.json();
      setAlerts(data.alerts || []);
    }

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [validator]);

  return (
    <div className="panel fade-in">
      <h3 className="neon">Operator Alerts</h3>

      {alerts.length === 0 && (
        <p style={{ color: "#2affff" }}>All systems normal</p>
      )}

      {alerts.map((a, i) => (
        <div
          key={i}
          style={{
            padding: "8px 0",
            color: "#ff3366",
            fontWeight: "bold",
            borderBottom: "1px solid #1f1f28",
          }}
        >
          ⚠️ {a}
        </div>
      ))}
    </div>
  );
}