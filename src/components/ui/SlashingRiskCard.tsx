import DashboardCard from "@/components/ui/DashboardCard";

export default function SlashingRiskCard({ score, category }) {
  const color =
    category === "Critical"
      ? "text-red-400"
      : category === "High"
      ? "text-orange-400"
      : category === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <DashboardCard title="Slashing Risk Score">
      <div className="text-4xl font-bold mb-2">
        <span className={color}>{score}</span>
        <span className="text-neutral-500 text-xl ml-2">/ 100</span>
      </div>

      <p className={`text-xl font-semibold ${color}`}>{category} Risk</p>

      <p className="text-neutral-400 mt-4">
        This score reflects recent validator behavior including double signing,
        surround votes, missed attestations, participation rate, and sync failures.
      </p>
    </DashboardCard>
  );
}