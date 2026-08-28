"use client";

import { useEffect, useState } from "react";

function usePing(url: string) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setStatus(data.status);
      } catch {
        setStatus("down");
      }
    }

    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, [url]);

  return status;
}

export function ChainStatus() {
  const eth = usePing("/api/ping/eth");
  const ton = usePing("/api/ping/ton");
  const tron = usePing("/api/ping/tron");

  const color = (s: string) =>
    s === "ok" ? "#2affff" : s === "loading" ? "#ffaa00" : "#ff0033";

  return (
    <div className="panel fade-in" style={{ display: "flex", gap: 20 }}>
      <div style={{ color: color(eth) }}>● ETH</div>
      <div style={{ color: color(ton) }}>● TON</div>
      <div style={{ color: color(tron) }}>● TRON</div>
    </div>
  );
}