"use client";

export function PeerCountChart({ peers }: any) {
  const points = Array.from({ length: 20 }).map((_, i) => {
    const jitter = peers + (Math.random() * 4 - 2);
    return `${i * 15},${120 - jitter}`;
  });

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-3">Peer Count</h2>

      <svg width="300" height="120" className="rounded-lg bg-neutral-800">
        <polyline
          fill="none"
          stroke="#4ade80"
          strokeWidth="3"
          points={points.join(" ")}
        />
      </svg>

      <p className="text-neutral-300 mt-2">{peers} peers</p>
    </div>
  );
}