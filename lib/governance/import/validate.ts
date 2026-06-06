export function validateSnapshot(snapshot: any) {
  if (!snapshot) throw new Error("Snapshot is empty");

  if (!snapshot.version) throw new Error("Snapshot missing version");
  if (!snapshot.exportedAt) throw new Error("Snapshot missing timestamp");

  if (!snapshot.roles) throw new Error("Snapshot missing roles");
  if (!snapshot.delegations) throw new Error("Snapshot missing delegations");
  if (!snapshot.ledger) throw new Error("Snapshot missing ledger");

  return true;
}
