import ChainStatus from "@/components/ChainStatus";
import OperatorAlerts from "@/components/OperatorAlerts";
import CommandPalette from "@/components/CommandPalette";
import RewardAnalytics from "@/components/RewardAnalytics";
import { VALIDATORS } from "@/lib/validators";

export default function DashboardPage() {
  return (
    <>
      <ChainStatus />
      <OperatorAlerts validator={VALIDATORS[0]} />
      <CommandPalette />
      <RewardAnalytics validator={VALIDATORS[0]} />
    </>
  );
}
