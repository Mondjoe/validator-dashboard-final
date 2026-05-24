import { ChainStatus } from "@/components/ChainStatus"
import { VALIDATORS } from "@/lib/validators";

<OperatorAlerts validator={VALIDATORS[0]} />

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