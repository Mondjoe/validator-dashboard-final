export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const res = await fetch("https://toncenter.com/api/v2/getMasterchainInfo");
    const data = await res.json();

    if (!data.ok) throw new Error("RPC error");

    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "down" });
  }
}
