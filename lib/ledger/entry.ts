export function createLedgerEntry(type: string, payload: any) {
  return {
    type,
    payload,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };
}
