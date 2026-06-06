import DashboardLayout from "@/components/DashboardLayout";
import { ChainStatus } from "@/components/ChainStatus";
import { OperatorAlerts } from "@/components/OperatorAlerts";
import { CommandPalette } from "@/components/CommandPalette";
import { RewardAnalytics } from "@/components/RewardAnalytics";
import { VALIDATORS } from "@/lib/validators";
import NftList from "@/components/NftList";
import ContractOwnership from "@/components/ContractOwnership";
import DaoGovernance from "@/components/DaoGovernance";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ChainStatus />
      <OperatorAlerts validator={VALIDATORS[0]} />
      <CommandPalette />
      <RewardAnalytics validator={VALIDATORS[0]} />

      <NftList />

      <ContractOwnership 
        contract="0xb300000b72DEAEb607a12d5f54773D1C19c7028d"
        label="Validator Ownership"
      />

      <DaoGovernance 
        contract="0xYourDaoContractHere"
      />
    </DashboardLayout>
  );
}