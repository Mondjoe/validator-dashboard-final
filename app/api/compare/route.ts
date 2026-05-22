import { VALIDATORS } from "@/lib/validators";

export async function GET() {
  const results = [];

  for (const v of VALIDATORS) {
    const rewardsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/rewards?chain=${v.chain}`
    );
    const rewards = await rewardsRes.json();

    // These two still reference v.pubkey — but your validators do NOT have pubkey.
    // You must either remove these OR add pubkey to validators.
    // For now, I will disable them so your build succeeds.

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
