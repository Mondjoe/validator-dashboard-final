export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) return Response.json({ txs: [] });

  try {
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc`
    );

    const data = await res.json();
    return Response.json({ txs: data.result.slice(0, 10) });
  } catch {
    return Response.json({ txs: [] });
  }
}