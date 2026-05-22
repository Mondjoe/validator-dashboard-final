import { VALIDATORS } from "@/lib/validators";

export default function DashboardPage() {
  return (
    <>
      <ChainStatus />
      <OperatorAlerts validator={VALIDATORS[0]} />
      <CommandPalette />
      <RewardAnalytics />
    </>
  );
}
