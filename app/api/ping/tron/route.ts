export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const res = await fetch("https://api.trongrid.io/wallet/getnowblock");
    const data = await res.json();

    if (!data.blockID) throw new Error("RPC error");

    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "down" });
  }
}