"use client";

import { governanceLedger } from "@/lib/ledger/store";

export function useLedger() {
  return {
    entries: governanceLedger,
  };
}
