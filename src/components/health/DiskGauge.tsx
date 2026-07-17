export function DiskGauge({ value }: any) {
  const percent = (value * 100).toFixed(1);

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-2">Disk Usage</h2>

      <div className="w-full bg-neutral-800 rounded-lg h-4 overflow-hidden">
        <div
          className="bg-purple-500 h-4 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-neutral-300 mt-2">{percent}%</p>
    </div>
  );
}