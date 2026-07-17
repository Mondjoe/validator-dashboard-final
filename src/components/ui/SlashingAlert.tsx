export default function SlashingAlert({ level, title, description, timestamp }) {
  const color =
    level === "critical"
      ? "text-red-400"
      : level === "warning"
      ? "text-yellow-400"
      : "text-blue-400";

  return (
    <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900">
      <h3 className={`text-lg font-semibold mb-2 ${color}`}>{title}</h3>

      <p className="text-neutral-300 mb-2">{description}</p>

      <p className="text-neutral-500 text-sm">{timestamp}</p>
    </div>
  );
}