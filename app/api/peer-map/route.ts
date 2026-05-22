export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");

  const peersRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/peers?chain=${chain}`
  );
  const peers = await peersRes.json();

  if (peers.error) return Response.json(peers);

  const results: any[] = [];

for (const peer of peers) {
  const geoRes = await fetch(`https://ipapi.co/${peer.ip}/json/`);
  const geo = await geoRes.json();
  results.push(geo);
}

return Response.json({ peers: results });

    const geoRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/geo`,
      {
        method: "POST",
        body: JSON.stringify({ ip })
      }
    );

    const geo = await geoRes.json();
    results.push(geo);
  }

  return Response.json({ peers: results });
}