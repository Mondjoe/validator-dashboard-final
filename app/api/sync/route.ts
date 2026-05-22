import { NODE_ENDPOINTS } from "@/lib/nodes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");

  if (!chain) return Response.json({ error: "Missing chain" });

  const nodes = NODE_ENDPOINTS[chain];
  if (!nodes) return Response.json({ error: "Unknown chain" });

  const results: any[] = [];

  for (const node of nodes) {
    try {
      const res = await fetch(node.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method:
            chain === "ETH"
              ? "eth_blockNumber"
              : chain === "TON"
              ? "getMasterchainInfo"
              : "wallet/getnowblock",
          params: []
        })
      });

      const data = await res.json();

      let height = 0;

      if (chain === "ETH") {
        height = parseInt(data.result, 16);
      } else if (chain === "TON") {
        height = data.result.last.seqno;
      } else if (chain === "TRON") {
        height = Number(data.block_header.raw_data.number);
      }

      results.push({
        id: node.id,
        url: node.url,
        height,
        ok: true
      });
    } catch {
      results.push({
        id: node.id,
        url: node.url,
        height: 0,
        ok: false
      });
    }
  }

  const maxHeight = Math.max(...results.map((r) => r.height));

  return Response.json({
    maxHeight,
    nodes: results.map((r) => ({
      ...r,
      lag: r.ok ? maxHeight - r.height : null
    }))
  });
}