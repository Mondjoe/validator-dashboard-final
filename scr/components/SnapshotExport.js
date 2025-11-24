import { validatorConfig } from "../config";

export default function SnapshotExport() {
  const snapshotData = JSON.stringify(validatorConfig.snapshot, null, 2);
  const encoded = encodeURIComponent(snapshotData);
  const ipfsGateway = "https://ipfs.io/ipfs/";

  function handleExport() {
    const blob = new Blob([snapshotData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "snapshot_930187.json";
    link.click();
  }

  return (
    <div>
      <button onClick={handleExport}>📤 Export Snapshot to IPFS</button>
      <p>Snapshot ID: {validatorConfig.snapshot.snapshotId}</p>
    </div>
  );
}
