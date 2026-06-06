export function exportIdentitySnapshot(identity: any) {
  const data = {
    generatedAt: new Date().toISOString(),
    identity,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `charm-identity-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
