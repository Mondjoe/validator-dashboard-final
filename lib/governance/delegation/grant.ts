export function createDelegationGrant({
  granterFingerprint,
  delegateFingerprint,
  allowedActions,
  expiresAt,
}) {
  return {
    granterFingerprint,
    delegateFingerprint,
    allowedActions,
    expiresAt,
    createdAt: new Date().toISOString(),
    version: "1.0.0",
  };
}
