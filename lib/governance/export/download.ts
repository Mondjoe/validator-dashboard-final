export function downloadSnapshot(snapshot: any) {
  const data = JSON.stringify(snapshot, null, 2);
  const blob = new Blob([data], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `governance-snapshot-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
