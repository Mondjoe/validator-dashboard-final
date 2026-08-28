"use client";

import { useEffect, useState } from "react";

export function GasTracker({ validator }: { validator: any }) {
  const [gas, setGas] = useState<any>(null);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(`/api/gas?chain=${validator.chain}`);
      const data = await res.json();
      setGas(data);
    }

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [validator]);

  if (!gas) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Gas Tracker</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (gas.error) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Gas Tracker</h3>
        <p style={{ color: "#ff3366" }}>{gas.error}</p>
      </div>
    );
  }

  return (
    <div className="panel fade-in">
      <h3 className="neon">Gas Tracker</h3>

      <div style={{ marginTop: 10, fontSize: 14 }}>
        <div>Base Fee: <span style={{ color: "#2affff" }}>{gas.base} {gas.unit}</span></div>
        <div>Propose: <span style={{ color: "#ffaa00" }}>{gas.propose} {gas.unit}</span></div>
        <div>Fast: <span style={{ color: "#ff3366" }}>{gas.fast} {gas.unit}</span></div>

        {validator.chain === "TRON" && (
          <div style={{ marginTop: 10 }}>
            Bandwidth Fee: <span style={{ color: "#2affff" }}>{gas.bandwidth} sun</span>
          </div>
        )}
      </div>
    </div>
  );
}