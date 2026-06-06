export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");

  if (!chain) return Response.json({ error: "Missing chain" });

  const map: any = {
    ETH: "ethereum",
    TON: "the-open-network",
    TRON: "tron",
  };

  const id = map[chain];
  if (!id) return Response.json({ error: "Unknown chain" });

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );

    const data = await res.json();
    const price = data[id]?.usd;

    return Response.json({ price });
  } catch {
    return Response.json({ error: "Price unavailable" });
  }
}