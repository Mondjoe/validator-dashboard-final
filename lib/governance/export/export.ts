import { collectGovernanceState } from "./collect";
import { createGovernanceSnapshot } from "./snapshot";

export function exportGovernanceState() {
  const state = collectGovernanceState();
  return createGovernanceSnapshot(state);
}
