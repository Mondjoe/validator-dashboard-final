export function addSignature(request: any, sig: any) {
  const alreadySigned = request.signatures.some(
    (s: any) => s.signerFingerprint === sig.signerFingerprint
  );

  if (alreadySigned) {
    throw new Error("Signer already approved");
  }

  request.signatures.push(sig);
  return request;
}
