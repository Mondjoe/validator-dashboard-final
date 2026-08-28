import DashboardCard from "@/components/ui/DashboardCard";
import UptimeChart from "@/components/ui/UptimeChart";

async function getUptimeData(id) {
  // Mock data — replace with your real validator uptime API
  return {
    epochs: [120, 121, 122, 123, 124, 125, 126],
    uptimePercent: [99.9, 99.8, 99.7, 99.9, 100, 99.8, 99.9],
    downtimeMinutes: [1, 3, 5, 2, 0, 4, 1],
  };
}

export default async function ValidatorUptimePage({ params }) {
  const uptime = await getUptimeData(params.id);

  return (
    <div className="flex flex-col gap-6">
      <DashboardCard title={`Validator ${params.id} — Uptime`}>
        <p className="text-neutral-400">
          Uptime and downtime metrics across recent epochs.
        </p>
      </DashboardCard>

      <UptimeChart
        title="Uptime (%)"
        labels={uptime.epochs}
        data={uptime.uptimePercent}
      />

      <UptimeChart
        title="Downtime (minutes)"
        labels={uptime.epochs}
        data={uptime.downtimeMinutes}
      />
    </div>
  );
}