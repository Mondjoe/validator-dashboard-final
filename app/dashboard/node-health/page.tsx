import { DashboardSummaryHeader } from "@/components/health/DashboardSummaryHeader";

export default function NodeHealthPage() {
  return (
    <div className="p-6">
      <DashboardSummaryHeader health={data} score={score} />
    </div>
  );
}