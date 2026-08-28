import DashboardCard from "@/components/ui/DashboardCard";
import LatencyChart from "@/components/ui/LatencyChart";

async function getLatencyData(id) {
  // Mock data — replace with your real validator latency API
  return {
    epochs: [120, 121, 122, 123, 124, 125, 126],
    avgLatencyMs: [120, 140, 110, 160, 180, 130, 125],
    maxLatencyMs: [220, 260, 210, 300, 320, 250, 240],
  };
}

export default async function ValidatorLatencyPage({ params }) {
  const latency = await getLatencyData(params.id);

  return (
    <div className="flex flex-col gap-6">
      <DashboardCard title={`Validator ${params.id} — Network Latency`}>
        <p className="text-neutral-400">
          Network latency metrics across recent epochs.
        </p>
      </DashboardCard>

      <LatencyChart
        title="Average Latency (ms)"
        labels={latency.epochs}
        data={latency.avgLatencyMs}
      />

      <LatencyChart
        title="Maximum Latency (ms)"
        labels={latency.epochs}
        data={latency.maxLatencyMs}
      />
    </div>
  );
}