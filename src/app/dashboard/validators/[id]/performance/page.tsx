import DashboardCard from "@/components/ui/DashboardCard";
import PerformanceChart from "@/components/ui/PerformanceChart";

async function getPerformanceData(id) {
  // Mock data — replace with your real validator metrics
  return {
    epochs: [120, 121, 122, 123, 124, 125, 126],
    inclusionRate: [98, 99, 97, 99, 100, 98, 99],
    attestationCorrectness: [96, 97, 95, 98, 99, 97, 98],
    syncParticipation: [92, 93, 94, 95, 96, 95, 97],
  };
}

export default async function ValidatorPerformancePage({ params }) {
  const perf = await getPerformanceData(params.id);

  return (
    <div className="flex flex-col gap-6">
      <DashboardCard title={`Validator ${params.id} — Performance`}>
        <p className="text-neutral-400">
          Detailed performance metrics across recent epochs.
        </p>
      </DashboardCard>

      <PerformanceChart
        title="Inclusion Rate (%)"
        labels={perf.epochs}
        data={perf.inclusionRate}
      />

      <PerformanceChart
        title="Attestation Correctness (%)"
        labels={perf.epochs}
        data={perf.attestationCorrectness}
      />

      <PerformanceChart
        title="Sync Participation (%)"
        labels={perf.epochs}
        data={perf.syncParticipation}
      />
    </div>
  );
}