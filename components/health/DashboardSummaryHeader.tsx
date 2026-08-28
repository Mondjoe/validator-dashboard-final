"use client";

export function DashboardSummaryHeader({ health, score }: any) {
  const statusColor =
    score.effectiveness > 85
      ? "text-green-400"
      : score.effectiveness > 60
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 mb-6">
      <h1 className="text-2xl font-bold mb-4">Operator Status</h1>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <p className="text-neutral-400 text-sm">Node Health</p>
          <p className="text-xl font-semibold text-blue-400">
            {health.network.latencyMs} ms latency
          </p>
        </div>

        <div>
          <p className="text-neutral-400 text-sm">Validator Score</p>
          <p className={`text-xl font-semibold ${statusColor}`}>
            {score.effectiveness} / 100
          </p>
        </div>

        <div>
          <p className="text-neutral-400 text-sm">Health Index</p>
          <p className="text-xl font-semibold text-purple-400">
            {score.healthIndex}
          </p>
        </div>
      </div>
    </div>
  );
}