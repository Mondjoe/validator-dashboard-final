"use client";

import { useEffect, useState } from "react";
import { pingEvm, pingSolana, pingTon, pingTron } from "@/lib/chain/ping";

export function useChainStatus() {
  const [status, setStatus] = useState({
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

    setStatus({ evm, solana: sol, ton, tron });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
