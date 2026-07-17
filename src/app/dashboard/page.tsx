import DashboardCard from "@/components/ui/DashboardCard";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard title="Validator Status">
        <p>Online • Syncing • Healthy</p>
      </DashboardCard>

      <DashboardCard title="Node Metrics">
        <p>CPU • RAM • Disk • Network</p>
      </DashboardCard>

      <DashboardCard title="Attestation Logs">
        <p>Performance • Missed • Included</p>
      </DashboardCard>
    </div>
  );
}