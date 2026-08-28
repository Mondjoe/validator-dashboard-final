import { roleBindings } from "@/lib/governance/roleBindings";
import { delegationRegistry } from "@/lib/governance/delegation/registry";
import { governanceLedger } from "@/lib/ledger/store";
import { validateSnapshot } from "./validate";
import { resetGovernanceState } from "./reset";

export function restoreGovernanceState(snapshot: any) {
  validateSnapshot(snapshot);

  resetGovernanceState();

  // Restore roles
  for (const fp in snapshot.roles) {
    roleBindings[fp] = snapshot.roles[fp];
  }

  // Restore delegations
  for (const fp in snapshot.delegations) {
    delegationRegistry[fp] = snapshot.delegations[fp];
  }

  // Restore ledger
  snapshot.ledger.forEach((entry: any) => {
    governanceLedger.push(entry);
  });

  return {
    restored: true,
    version: snapshot.version,
    restoredAt: new Date().toISOString(),
  };
}
