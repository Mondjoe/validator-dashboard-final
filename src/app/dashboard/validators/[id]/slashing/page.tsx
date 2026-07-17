import DashboardCard from "@/components/ui/DashboardCard";
import SlashingAlert from "@/components/ui/SlashingAlert";

async function getSlashingAlerts(id) {
  // Mock data — replace with your real validator slashing API
  return [
    {
      level: "critical",
      title: "Double Signing Detected",
      description:
        "Validator signed two conflicting blocks. Immediate investigation required.",
      timestamp: "Epoch 125 • 2026-07-17 14:22 UTC",
    },
    {
      level: "warning",
      title: "Surround Vote Risk",
      description:
        "Validator produced an attestation that may conflict with previous votes.",
      timestamp: "Epoch 124 • 2026-07-17 13:10 UTC",
    },
    {
      level: "info",
      title: "Low Participation",
      description:
        "Validator missed several attestations. Monitoring recommended.",
      timestamp: "Epoch 123 • 2026-07-17 12:01 UTC",
    },
  ];
}

export default async function SlashingPage({ params }) {
  const alerts = await getSlashingAlerts(params.id);

  return (
    <div className="flex flex-col gap-6">
      <DashboardCard title={`Validator ${params.id} — Slashing Alerts`}>
        <p className="text-neutral-400">
          Review critical slashing risks and historical events.
        </p>
      </DashboardCard>

      <div className="flex flex-col gap-4">
        {alerts.map((alert, i) => (
          <SlashingAlert
            key={i}
            level={alert.level}
            title={alert.title}
            description={alert.description}
            timestamp={alert.timestamp}
          />
        ))}
      </div>
    </div>
  );
}