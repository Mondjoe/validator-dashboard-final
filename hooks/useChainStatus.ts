"use client";

import { useEffect, useState } from "react";
import { pingEvm, pingSolana, pingTon, pingTron } from "@/lib/chain/ping";

export function useChainStatus() {
 const [status, setStatus] = useState<{
  evm: number | null;
  solana: number | null;
  ton: number | null;
  tron: number | null;
}>({
  evm: null,
  solana: null,
  ton: null,
  tron: null,
});

  async function refresh() {
    const [evm, sol, ton, tron] = await Promise.all([
      pingEvm(),
      pingSolana(),
      pingTon(),
      pingTron(),
    ]);

   setStatus({
  evm: evm ?? null,
  solana: sol ?? null,
  ton: ton ?? null,
  tron: tron ?? null,
});
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
