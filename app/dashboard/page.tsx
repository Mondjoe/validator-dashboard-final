import { ChainStatus } from '@/components/ChainStatus';
import { OperatorAlerts } from '@/components/OperatorAlerts';
import { CommandPalette } from '@/components/CommandPalette';
import { RewardAnalytics } from '@/components/RewardAnalytics';
import NftList from '@/components/NftList';
import ContractOwnership from '@/components/ContractOwnership';
import DaoGovernance from '@/components/DaoGovernance';
import { VALIDATORS } from '@/lib/validators';

export default function DashboardPage() {
  const validator = VALIDATORS[0];

  return (
    <div className="space-y-6">
      <ChainStatus />
      <OperatorAlerts validator={validator} />
      <CommandPalette />
      <RewardAnalytics validator={validator} />

      <section className="grid gap-6 md:grid-cols-2">
        <NftList />
        <ContractOwnership
          contract="0xb300000b72DEAEb607a12d5f54773D1C19c7028d"
          label="Validator Ownership"
        />
      </section>

      <DaoGovernance contract="0xYourDaoContractHere" />
    </div>
  );
}
