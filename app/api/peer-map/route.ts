export const dynamic = "force-dynamic";
export async function GET() {
  const results: any[] = [];

  const peers = [
    { ip: "8.8.8.8" },
    { ip: "1.1.1.1" }
  ];

  for (const peer of peers) {
    const geoRes = await fetch(`https://ipapi.co/${peer.ip}/json/`);
    const geo = await geoRes.json();
    results.push(geo);
  }

  return Response.json({ peers: results });
}