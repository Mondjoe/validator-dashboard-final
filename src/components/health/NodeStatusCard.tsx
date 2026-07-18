"use client";

import { NodeStatusCard } from "@/components/health/NodeStatusCard";
import { CpuGauge } from "@/components/health/CpuGauge";
import { RamGauge } from "@/components/health/RamGauge";
import { DiskGauge } from "@/components/health/DiskGauge";
import { LatencyChart } from "@/components/health/LatencyChart";
import { PeerCountChart } from "@/components/health/PeerCountChart";
import { ValidatorPerformanceCard } from "@/components/health/ValidatorPerformanceCard";
import { AlertsPanel } from "@/components/health/AlertsPanel";
import { useEffect, useState } from "react";

export default function NodeHealthPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: any;

    async function load() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/operator/node-health`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Failed to load node health:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
    timer = setInterval(load, 5000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="p-6 text-neutral-400">Loading operator node health…</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-400">Failed to load node health data.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

      <NodeStatusCard
        status={data.status}
        lastHeartbeat={data.lastHeartbeat}
      />

      <CpuGauge value={data.system.cpu} />
      <RamGauge value={data.system.ram} />
      <DiskGauge value={data.system.disk} />

      <LatencyChart latency={data.network.latencyMs} />
      <PeerCountChart peers={data.network.peerCount} />

      <ValidatorPerformanceCard validator={data.validator} />

      <AlertsPanel alerts={data.alerts} />

    </div>
  );
}export function NodeStatusCard({ status, lastHeartbeat }: any) {
  const color =
    status === "HEALTHY"
      ? "text-green-400"
      : status === "DEGRADED"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-2">Node Status</h2>
      <p className={`${color} text-lg font-bold`}>{status}</p>
      <p className="text-neutral-400 text-sm mt-1">
        Last heartbeat: {lastHeartbeat}
      </p>
    </div>
  );
}