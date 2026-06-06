import { roleBindings } from "@/lib/governance/roleBindings";
import { delegationRegistry } from "@/lib/governance/delegation/registry";
import { governanceLedger } from "@/lib/ledger/store";

export function collectGovernanceState() {
  return {
    roles: roleBindings,
    delegations: delegationRegistry,
    ledger: governanceLedger,
    multisigs: [], // optional: store active multisig requests
    identities: [], // optional: store known capsule identities
  };
}
