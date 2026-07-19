"use client";

export function LatencyChart({ latency }: any) {
  const points = Array.from({ length: 20 }).map((_, i) => {
    const jitter = latency + (Math.random() * 15 - 7);
    return `${i * 15},${120 - jitter}`;
  });

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-3">Network Latency</h2>

      <svg width="300" height="120" className="rounded-lg bg-neutral-800">
        <polyline
          fill="none"
          stroke="#facc15"
          strokeWidth="3"
          points={points.join(" ")}
        />
      </svg>

      <p className="text-neutral-300 mt-2">{latency} ms</p>
    </div>
  );
}