export function createGovernanceSnapshot({
  identities,
  roles,
  delegations,
  multisigs,
  ledger,
  version = "1.0.0",
}) {
  return {
    version,
    exportedAt: new Date().toISOString(),
    identities,
    roles,
    delegations,
    multisigs,
    ledger,
  };
}
