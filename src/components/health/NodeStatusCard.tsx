export function NodeStatusCard({ status, lastHeartbeat }: any) {
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