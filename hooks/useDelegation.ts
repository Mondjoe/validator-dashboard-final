"use client";

import { useIdentity } from "@/hooks/useIdentity";
import { buildCapsuleIdentity } from "@/lib/identity/capsule";
import { verifyDelegation } from "@/lib/governance/delegation/verify";

export function useDelegation() {
  const id = useIdentity();
  const capsule = buildCapsuleIdentity(id);

  function can(action: string) {
    return verifyDelegation(capsule.fingerprint, action);
  }

  return { can };
}
