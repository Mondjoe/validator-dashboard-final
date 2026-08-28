import DashboardCard from "@/components/ui/DashboardCard";
import SlashingRiskCard from "@/components/ui/SlashingRiskCard";
import PerformanceChart from "@/components/ui/PerformanceChart";
import UptimeChart from "@/components/ui/UptimeChart";
import LatencyChart from "@/components/ui/LatencyChart";
import { calculateSlashingRisk } from "@/lib/slashingRisk";

async function getValidatorAnalytics(id) {
  // Mock data — replace with real APIs
  return {
    validator: {
      id,
      status: "online",
      balance: "32.1 ETH",
      performance: "99.2%",
    },
    performance: {
      epochs: [120, 121, 122, 123, 124, 125, 126],
      inclusionRate: [98, 99, 97, 99, 100, 98, 99],
      correctness: [96, 97, 95, 98, 99, 97, 98],
    },
    uptime: {
      epochs: [120, 121, 122, 123, 124, 125, 126],
      uptimePercent: [99.9, 99.8, 99.7, 99.9, 100, 99.8, 99.9],
      downtimeMinutes: [1, 3, 5, 2, 0, 4, 1],
    },
    latency: {
      epochs: [120, 121, 122, 123, 124, 125, 126],
      avgLatencyMs: [120, 140, 110, 160, 180, 130, 125],
      maxLatencyMs: [220, 260, 210, 300, 320, 250, 240],
    },
    slashingSignals: {
      doubleSignEvents: 0,
      surroundVoteEvents: 1,
      missedAttestations: 8,
      lowParticipationEpochs: 3,
      syncFailures: 1,
      correctnessRate: 95,
    },
  };
}

export default async function ValidatorAnalyticsPage({ params }) {
  const analytics = await getValidatorAnalytics(params.id);

  const risk = calculateSlashingRisk(analytics.slashingSignals);

  return (
    <div className="flex flex-col gap-6">
      {/* Overview */}
      <DashboardCard title={`Validator ${analytics.validator.id} — Analytics`}>
        <p className="text-neutral-400">
          Consolidated performance, uptime, latency, and slashing risk metrics.
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-neutral-400">Status</p>
            <p className="text-green-400">{analytics.validator.status}</p>
          </div>
          <div>
            <p className="text-neutral-400">Balance</p>
            <p className="text-neutral-200">{analytics.validator.balance}</p>
          </div>
          <div>
            <p className="text-neutral-400">Performance</p>
            <p className="text-neutral-200">{analytics.validator.performance}</p>
          </div>
        </div>
      </DashboardCard>

      {/* Slashing Risk */}
      <SlashingRiskCard score={risk.score} category={risk.category} />

      {/* Performance */}
      <PerformanceChart
        title="Inclusion Rate (%)"
        labels={analytics.performance.epochs}
        data={analytics.performance.inclusionRate}
      />
      <PerformanceChart
        title="Attestation Correctness (%)"
        labels={analytics.performance.epochs}
        data={analytics.performance.correctness}
      />

      {/* Uptime */}
      <UptimeChart
        title="Uptime (%)"
        labels={analytics.uptime.epochs}
        data={analytics.uptime.uptimePercent}
      />
      <UptimeChart
        title="Downtime (minutes)"
        labels={analytics.uptime.epochs}
        data={analytics.uptime.downtimeMinutes}
      />

      {/* Latency */}
      <LatencyChart
        title="Average Latency (ms)"
        labels={analytics.latency.epochs}
        data={analytics.latency.avgLatencyMs}
      />
      <LatencyChart
        title="Maximum Latency (ms)"
        labels={analytics.latency.epochs}
        data={analytics.latency.maxLatencyMs}
      />
    </div>
  );
}