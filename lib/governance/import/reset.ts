import { roleBindings } from "@/lib/governance/roleBindings";
import { delegationRegistry } from "@/lib/governance/delegation/registry";
import { governanceLedger } from "@/lib/ledger/store";

export function resetGovernanceState() {
  // Clear roles
  for (const key in roleBindings) delete roleBindings[key];

  // Clear delegations
  for (const key in delegationRegistry) delete delegationRegistry[key];

  // Clear ledger
  governanceLedger.length = 0;
}
