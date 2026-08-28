export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const { ip } = await req.json();

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    return Response.json({
      ip,
      country: data.country_name,
      city: data.city,
      lat: data.latitude,
      lon: data.longitude,
      asn: data.asn
    });
  } catch {
    return Response.json({ ip, error: "Geo lookup failed" });
  }
}