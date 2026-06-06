"use client";

import { useIdentity } from "@/hooks/useIdentity";
import { useCapsuleSigner } from "@/hooks/useCapsuleSigner";
import { createProposal } from "@/lib/governance/proposal";
import { signProposal } from "@/lib/governance/signProposal";

export function useProposal() {
  const id = useIdentity();
  const { sign } = useCapsuleSigner();

  async function createAndSign({ title, description, actions }) {
    const proposal = createProposal({ title, description, actions });

    return await signProposal(id, proposal, {
      solWallet: null,
      tonUI: null,
      sign,
    });
  }

  return { createAndSign };
}
