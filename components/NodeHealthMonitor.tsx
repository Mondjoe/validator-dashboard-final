"use client";

import { useEffect, useState } from "react";
import { getEthNodeHealth } from "@/lib/nodeHealthEth";
import { getTonNodeHealth } from "@/lib/nodeHealthTon";
import { getTronNodeHealth } from "@/lib/nodeHealthTron";

type NodeHealth = {
  status?: any;
  block?: any;
  sync: any;
  peers: any;
};

export function NodeHealthMonitor() {
  const [eth, setEth] = useState<NodeHealth | null>(null);
  const [ton, setTon] = useState<NodeHealth | null>(null);
  const [tron, setTron] = useState<NodeHealth | null>(null);

  async function load() {
    try { setEth(await getEthNodeHealth()); } catch {}
    try { setTon(await getTonNodeHealth()); } catch {}
    try { setTron(await getTronNodeHealth()); } catch {}
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel">
      <h2>Node Health Monitor</h2>

      <div className="panel" style={{ background: "var(--bg-panel-alt)" }}>
        <h3>Ethereum Node</h3>
        <pre>{JSON.stringify(eth, null, 2)}</pre>
      </div>

      <div className="panel" style={{ background: "var(--bg-panel-alt)" }}>
        <h3>TON Node</h3>
        <pre>{JSON.stringify(ton, null, 2)}</pre>
      </div>

      <div className="panel" style={{ background: "var(--bg-panel-alt)" }}>
        <h3>TRON Node</h3>
        <pre>{JSON.stringify(tron, null, 2)}</pre>
      </div>
    </div>
  );
}
