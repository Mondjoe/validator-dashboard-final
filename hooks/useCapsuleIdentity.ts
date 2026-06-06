"use client";

import { useIdentity } from "./useIdentity";
import { buildCapsuleIdentity } from "@/lib/identity/capsule";

export function useCapsuleIdentity() {
  const id = useIdentity();
  return buildCapsuleIdentity(id);
}
