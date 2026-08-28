export async function getTonNodeHealth() {
  const res = await fetch("http://localhost:8081/status");
  const data = await res.json();

  return {
    status: data.status ?? "unknown",
    sync: data.sync ?? false,
    synced: data.synced,
    lastBlock: data.lastBlock,
    peers: data.peers,
  };
}
