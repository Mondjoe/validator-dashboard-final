export async function getTronNodeHealth() {
  const res = await fetch("http://localhost:8090/wallet/getnodeinfo");
  const data = await res.json();

  return {
    block: data.block,
    sync: data.sync,
    peers: data.peers,
  };
}