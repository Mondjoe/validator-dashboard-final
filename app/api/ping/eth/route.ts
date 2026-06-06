export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const res = await fetch("https://rpc.ankr.com/eth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1,
      }),
    });

    if (!res.ok) throw new Error("RPC error");

    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "down" });
  }
}