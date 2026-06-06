import { delegationRegistry } from "./registry";

export function storeDelegation(grant: any) {
  const target = grant.grant.delegateFingerprint;

  if (!delegationRegistry[target]) {
    delegationRegistry[target] = [];
  }

  delegationRegistry[target].push(grant);

  return grant;
}
