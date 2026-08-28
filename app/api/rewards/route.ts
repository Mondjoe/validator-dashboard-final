export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");
  const pubkey = searchParams.get("pubkey");

  if (!chain || !pubkey) {
    return Response.json({ error: "Missing parameters" });
  }

  if (chain === "ETH") {
    try {
      const res = await fetch(
        `https://beaconcha.in/api/v1/validator/${pubkey}/performance`
      );
      const data = await res.json();

      const perf = data.data;

      return Response.json({
        apr: perf.apr,
        apy: perf.apy,
        daily: perf.daily,
        monthly: perf.daily * 30,
        yearly: perf.daily * 365,
      });
    } catch {
      return Response.json({ error: "ETH rewards unavailable" });
    }
  }

  if (chain === "TON") {
    try {
      const res = await fetch(
        `https://tonapi.io/v2/staking/validators/${pubkey}`
      );
      const data = await res.json();

      return Response.json({
        apr: data.apr,
        apy: data.apy,
        daily: data.apr / 365,
        monthly: (data.apr / 365) * 30,
        yearly: data.apr,
      });
    } catch {
      return Response.json({ error: "TON rewards unavailable" });
    }
  }

  if (chain === "TRON") {
    try {
      const res = await fetch(
        `https://api.trongrid.io/v1/accounts/${pubkey}/votes`
      );
      const data = await res.json();

      const rewards = data.data?.[0]?.reward || 0;

      return Response.json({
        apr: rewards / 1000000,
        apy: (rewards / 1000000) * 1.05,
        daily: rewards / 365,
        monthly: (rewards / 365) * 30,
        yearly: rewards,
      });
    } catch {
      return Response.json({ error: "TRON rewards unavailable" });
    }
  }

  return Response.json({ error: "Unknown chain" });
}