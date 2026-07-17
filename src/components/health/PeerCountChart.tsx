export function PeerCountChart({ peers }: any) {
  const bars = Array.from({ length: 10 }).map(() =>
    Math.max(5, peers + (Math.random() * 10 - 5))
  );

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-2">Peer Count</h2>

      <div className="flex items-end gap-2 h-24">
        {bars.map((v, i) => (
          <div
            key={i}
            className="bg-green-500 w-3 rounded"
            style={{ height: `${v}px` }}
          />
        ))}
      </div>

      <p className="text-neutral-300 mt-2">{peers} peers</p>
    </div>
  );
}