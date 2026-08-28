export async function getEthNodeHealth() {
  const res = await fetch("http://localhost:5052/eth/v1/node/health");
  const data = await res.json();

  return {
    status: data.data.status,
    sync: data.data.sync_status,
    peers: data.data.peers,
  };
}