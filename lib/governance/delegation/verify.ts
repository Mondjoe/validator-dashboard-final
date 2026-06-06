import { delegationRegistry } from "./registry";

export function verifyDelegation(delegateFingerprint: string, action: string) {
  const grants = delegationRegistry[delegateFingerprint] || [];

  const now = Date.now();

  for (const grant of grants) {
    const { allowedActions, expiresAt } = grant.grant;

    if (now > new Date(expiresAt).getTime()) continue;

    if (allowedActions.includes(action)) {
      return true;
    }
  }

  return false;
}
