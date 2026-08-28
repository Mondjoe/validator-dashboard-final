"use client";

import { useEffect, useState } from "react";

export function PeerMap({ validator }: { validator: any }) {
  const [peers, setPeers] = useState<any[]>([]);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(`/api/peer-map?chain=${validator.chain}`);
      const data = await res.json();
      setPeers(data.peers || []);
    }

    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, [validator]);

  return (
    <div className="panel fade-in">
      <h3 className="neon">Real‑Time Peer Map</h3>

      <div style={{
        width: "100%",
        height: 300,
        background: "#0c0c10",
        border: "1px solid #1f1f28",
        position: "relative"
      }}>
        {peers.map((p, i) => (
          p.lat && p.lon && (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(p.lon + 180) / 360 * 100}%`,
                top: `${(90 - p.lat) / 180 * 100}%`,
                width: 8,
                height: 8,
                background: "#2affff",
                borderRadius: "50%",
                boxShadow: "0 0 10px #2affff"
              }}
              title={`${p.city}, ${p.country} (${p.ip})`}
            />
          )
        ))}
      </div>

      <div style={{ marginTop: 10, fontSize: 13 }}>
        {peers.map((p, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <span style={{ color: "#2affff" }}>{p.ip}</span> —{" "}
            {p.city}, {p.country} — ASN {p.asn}
          </div>
        ))}
      </div>
    </div>
  );
}