"use client";

import { useIdentity } from "@/hooks/useIdentity";
import { sessionSign } from "@/lib/capsule/session/sign";

export function useSessionSigner() {
  const id = useIdentity();

  async function sign(message: string) {
    return await sessionSign(id, message);
  }

  return { sign };
}
