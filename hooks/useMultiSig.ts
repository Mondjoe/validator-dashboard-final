"use client";

import { useIdentity } from "@/hooks/useIdentity";
import { useCapsuleSigner } from "@/hooks/useCapsuleSigner";
import { signMultiSig } from "@/lib/governance/multisig/sign";
import { addSignature } from "@/lib/governance/multisig/addSignature";
import { executeMultiSig } from "@/lib/governance/multisig/execute";

export function useMultiSig() {
  const id = useIdentity();
  const { sign } = useCapsuleSigner();

  async function approve(request: any) {
    const sig = await signMultiSig(id, request, { sign });
    return addSignature(request, sig);
  }

  function execute(request: any) {
    return executeMultiSig(request);
  }

  return { approve, execute };
}
