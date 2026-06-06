export const governanceLedger: any[] = [];

export function appendToLedger(entry: any) {
  governanceLedger.push(entry);
  return entry;
}
