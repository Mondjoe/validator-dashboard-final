"use client";

import { useEffect, useState } from "react";

export function IncidentTimeline() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/incidents");
      const data = await res.json();
      setIncidents(data.incidents || []);
    }

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel fade-in">
      <h3 className="neon">Incident Timeline</h3>

      {incidents.length === 0 && (
        <p style={{ color: "#2affff" }}>No incidents recorded</p>
      )}

      {incidents.map((i: any, idx) => (
        <div
          key={idx}
          style={{
            padding: "10px 0",
            borderBottom: "1px solid #1f1f28",
            fontSize: 13,
          }}
        >
          <div style={{ color: "#ffaa00" }}>
            {new Date(i.time).toLocaleString()}
          </div>

          <div style={{ color: "#2affff", marginTop: 4 }}>
            {i.type.toUpperCase()}
          </div>

          <div style={{ color: "#ccc", marginTop: 4 }}>
            {JSON.stringify(i, null, 2)}
          </div>
        </div>
      ))}
    </div>
  );
}