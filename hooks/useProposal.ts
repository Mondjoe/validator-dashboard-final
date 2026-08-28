"use client";

import { useIdentity } from "@/hooks/useIdentity";
import { useCapsuleSigner } from "@/hooks/useCapsuleSigner";
import { createProposal } from "@/lib/governance/proposal";
import { signProposal } from "@/lib/governance/signProposal";

export function useProposal() {
  const id = useIdentity();
  const { sign } = useCapsuleSigner();

  async function createAndSign({
    title,
    description,
    actions,
  }: {
    title: string;
    description: string;
    actions: any[];
  }) {
    // 1. Create proposal object
    const proposal = createProposal({
      title,
      description,
      actions,
    });

    // 2. Sign proposal
    return await signProposal(id, proposal, {
      solWallet: null,
      tonUI: null,
      tronWallet: null,
      sign,
    });
  }

  return { createAndSign };
}
