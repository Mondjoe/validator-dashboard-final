"use client";

import { useEffect, useState } from "react";

export default function NodeHealthPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-neutral-400">
        Loading operator node health…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-red-400">
        Failed to load node health data.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      
      {/* Node Status */}
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">Node Status</h2>
        <p className="text-neutral-300">Status: {data.status}</p>
        <p className="text-neutral-400 text-sm mt-1">
          Last heartbeat: {data.lastHeartbeat}
        </p>
      </div>

      {/* System Metrics */}
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">System Metrics</h2>
        <p className="text-neutral-300">CPU: {(data.system.cpu * 100).toFixed(1)}%</p>
        <p className="text-neutral-300">RAM: {(data.system.ram * 100).toFixed(1)}%</p>
        <p className="text-neutral-300">Disk: {(data.system.disk * 100).toFixed(1)}%</p>
      </div>

      {/* Network Metrics */}
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">Network</h2>
        <p className="text-neutral-300">Latency: {data.network.latencyMs} ms</p>
        <p className="text-neutral-300">Inbound: {data.network.inMbps} Mbps</p>
        <p className="text-neutral-300">Outbound: {data.network.outMbps} Mbps</p>
        <p className="text-neutral-300">Peers: {data.network.peerCount}</p>
        <p className="text-neutral-300">Head Lag: {data.network.headLag}</p>
      </div>

      {/* Validator Metrics */}
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 lg:col-span-2">
        <h2 className="text-xl font-semibold mb-2">Validator Performance</h2>
        <p className="text-neutral-300">Index: {data.validator.index}</p>
        <p className="text-neutral-300">
          Participation: {(data.validator.participationRate * 100).toFixed(2)}%
        </p>
        <p className="text-neutral-300">
          Missed Attestations (24h): {data.validator.missedAttestations24h}
        </p>
        <p className="text-neutral-300">
          Proposals (24h): {data.validator.proposals24h}
        </p>
        <p className="text-neutral-300">
          Rewards (Day): {data.validator.rewardsDay}
        </p>
      </div>

      {/* Client Versions */}
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">Client Versions</h2>
        <p className="text-neutral-300">
          Execution: {data.client.execution.name} {data.client.execution.version}
        </p>
        <p className="text-neutral-300">
          Consensus: {data.client.consensus.name} {data.client.consensus.version}
        </p>
      </div>

      {/* Alerts */}
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 lg:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Alerts</h2>

        {data.alerts.length === 0 && (
          <p className="text-neutral-400">No active alerts.</p>
        )}

        {data.alerts.length > 0 && (
          <div className="space-y-3">
            {data.alerts.map((alert: any) => (
              <div
                key={alert.id}
                className="p-4 rounded-lg bg-neutral-800 border border-neutral-700"
              >
                <p className="text-neutral-200 font-semibold">
                  {alert.severity} — {alert.message}
                </p>
                <p className="text-neutral-400 text-sm">
                  Started: {alert.startedAt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}