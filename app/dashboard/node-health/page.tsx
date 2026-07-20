import { DashboardSummaryHeader } from "@/components/health/DashboardSummaryHeader";

export default async function NodeHealthPage() {
  const healthRes = await fetch(`${process.env.NEXT_PUBLIC_API}/operator/node-health`, {
    cache: "no-store",
  });
  const health = await healthRes.json();

  const scoreRes = await fetch(`${process.env.NEXT_PUBLIC_API}/operator/validator-score`, {
    cache: "no-store",
  });
  const score = await scoreRes.json();

  return (
    <div className="p-6">
      <DashboardSummaryHeader health={health} score={score} />
    </div>
  );
}