import { ChainStatus } from "@/components/ChainStatus"
import { VALIDATORS } from "@/lib/validators";
import { OperatorAlerts } from "@/components/OperatorAlerts"; // ← ADD THIS IMPORT
import { CommandPalette } from "@/components/CommandPalette"; // if needed
import { RewardAnalytics } from "@/components/RewardAnalytics"; // if needed

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