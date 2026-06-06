"use client";

import { useIdentity } from "@/hooks/useIdentity";
import { hasPermission } from "@/lib/governance/checkPermission";

export function useAccess() {
  const id = useIdentity();

  function can(action: string) {
    return hasPermission(id, action);
  }

  return { can };
}
