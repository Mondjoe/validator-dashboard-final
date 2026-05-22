import { VALIDATORS } from "@/lib/validators";

export async function GET() {
  const results: any[] = [];

  for (const v of VALIDATORS) {
    const rewardsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/rewards?chain=${v.chain}`
    );
    const rewards = await rewardsRes.json();

    // Disabled pubkey-based calls (your validators do not have pubkey)
    const uptime = { data: { efficiency: 0 } };
    const performance = { data: {} };

    results.push({
      id: v.id,
      chain: v.chain,
      rewards,
      uptime: uptime.data?.efficiency || 0,
      performance: performance.data || {}
    });
  }

  return Response.json({ validators: results });
}
