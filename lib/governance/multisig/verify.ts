export function verifyMultiSig(request: any) {
  const required = request.requiredSigners.length;
  const collected = request.signatures.length;

  return collected >= required;
}
