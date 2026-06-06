import { verifyMultiSig } from "./verify";

export function executeMultiSig(request: any) {
  if (!verifyMultiSig(request)) {
    throw new Error("Not enough signatures to execute");
  }

  return {
    executed: true,
    action: request.action,
    signatures: request.signatures,
    timestamp: new Date().toISOString(),
  };
}
