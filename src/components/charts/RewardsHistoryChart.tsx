"use client";

export function RewardsHistoryChart({ history }: any) {
  const points = history.map((h: any, i: number) => {
    return `${i * 40},${80 - h.amount * 80}`;
  });

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 lg:col-span-3">
      <h2 className="text-xl font-semibold mb-3">7‑Day Rewards Trend</h2>

      <svg width="280" height="80" className="rounded-lg bg-neutral-800">
        <polyline
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          points={points.join(" ")}
        />
      </svg>

      <div className="flex gap-4 mt-3 text-neutral-400 text-sm">
        {history.map((h: any) => (
          <span key={h.day}>{h.day}</span>
        ))}
      </div>
    </div>
  );
}