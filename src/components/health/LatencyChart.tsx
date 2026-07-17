export function LatencyChart({ latency }: any) {
  const bars = Array.from({ length: 12 }).map(() =>
    Math.max(10, latency + (Math.random() * 20 - 10))
  );

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-2">Network Latency</h2>

      <div className="flex items-end gap-2 h-24">
        {bars.map((v, i) => (
          <div
            key={i}
            className="bg-yellow-500 w-3 rounded"
            style={{ height: `${v}px` }}
          />
        ))}
      </div>

      <p className="text-neutral-300 mt-2">{latency} ms</p>
    </div>
  );
}