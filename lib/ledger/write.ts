import { createLedgerEntry } from "./entry";
import { hashEntry } from "./hash";
import { appendToLedger } from "./store";

export async function writeLedger(type: string, payload: any) {
  const entry = createLedgerEntry(type, payload);
  const hash = await hashEntry(entry);

  const finalEntry = {
    ...entry,
    hash,
  };

  return appendToLedger(finalEntry);
}
