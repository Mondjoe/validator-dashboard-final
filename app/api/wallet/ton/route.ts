export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) return Response.json({ txs: [] });

  try {
    const res = await fetch(
      `https://toncenter.com/api/v2/getTransactions?address=${address}&limit=10`
    );

    const data = await res.json();
    return Response.json({ txs: data.result });
  } catch {
    return Response.json({ txs: [] });
  }
}