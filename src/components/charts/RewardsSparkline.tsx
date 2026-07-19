"use client";

export function RewardsSparkline({ rewards }: any) {
  const points = rewards.map((v: number, i: number) => {
    return `${i * 12},${40 - v * 40}`;
  });

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-3">Daily Rewards</h2>

      <svg width="240" height="40" className="rounded-lg bg-neutral-800">
        <polyline
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          points={points.join(" ")}
        />
      </svg>

      <p className="text-neutral-300 mt-2">
        Today: {rewards[rewards.length - 1]}
      </p>
    </div>
  );
}