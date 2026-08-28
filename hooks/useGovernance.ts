"use client";

import { useIdentity } from "@/hooks/useIdentity";
import { useCapsuleSigner } from "@/hooks/useCapsuleSigner";
import { authorizeGovernanceAction } from "@/lib/governance/authorize";

export function useGovernance() {
  const id = useIdentity();
  const { sign } = useCapsuleSigner();

  async function authorize(action: any) {
    return await authorizeGovernanceAction(id, action, {
      solWallet: null,
      tonUI: null,
      sign,
    });
  }

  return { authorize };
}
