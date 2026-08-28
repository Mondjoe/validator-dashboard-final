export function createMultiSigRequest({ action, requiredSigners }) {
  return {
    action,
    requiredSigners, // array of capsule fingerprints
    signatures: [],
    createdAt: new Date().toISOString(),
    version: "1.0.0",
  };
}
