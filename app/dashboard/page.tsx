import ChainStatus from "@/components/ui/ChainStatus";
import ChainStatus from "@/components/ChainStatus";
import OperatorAlerts from "@/components/OperatorAlerts";
import CommandPalette from "@/components/CommandPalette";
import RewardAnalytics from "@/components/RewardAnalytics";
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