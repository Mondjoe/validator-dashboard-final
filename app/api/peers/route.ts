export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");

  if (!chain) return Response.json({ error: "Missing chain" });

  let peers: any[] = [];

  try {
    if (chain === "ETH") {
      const res = await fetch("http://localhost:8545", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "admin_peers",
          params: []
        })
      });
      const data = await res.json();
      peers = data.result || [];
    }

    if (chain === "TON") {
      const res = await fetch("http://localhost:8081/getPeers");
      const data = await res.json();
      peers = data.peers || [];
    }

    if (chain === "TRON") {
      const res = await fetch("https://api.trongrid.io/wallet/getpeers");
      const data = await res.json();
      peers = data.peers || [];
    }
  } catch {
    return Response.json({ error: "Peer list unavailable" });
  }

  return Response.json({ peers });
}