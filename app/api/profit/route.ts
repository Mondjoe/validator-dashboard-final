export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const chain = searchParams.get("chain");
  const pubkey = searchParams.get("pubkey");
  const hardware = Number(searchParams.get("hardware") || 0);
  const electricity = Number(searchParams.get("electricity") || 0);
  const power = Number(searchParams.get("power") || 0); // watts
  const validators = Number(searchParams.get("validators") || 1);

  if (!chain || !pubkey) {
    return Response.json({ error: "Missing parameters" });
  }

  // Fetch reward analytics
  const rewardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/rewards?chain=${chain}&pubkey=${pubkey}`
  );
  const reward = await rewardRes.json();

  if (reward.error) {
    return Response.json({ error: reward.error });
  }

  // Revenue
  const dailyRevenue = reward.daily * validators;
  const monthlyRevenue = reward.monthly * validators;
  const yearlyRevenue = reward.yearly * validators;

  // Electricity cost (if applicable)
  const dailyPowerCost = (power / 1000) * 24 * electricity;
  const monthlyPowerCost = dailyPowerCost * 30;
  const yearlyPowerCost = dailyPowerCost * 365;

  // Profit
  const monthlyProfit = monthlyRevenue - monthlyPowerCost;
  const yearlyProfit = yearlyRevenue - yearlyPowerCost;

  // Break-even
  const breakEvenMonths = hardware > 0 && monthlyProfit > 0
    ? hardware / monthlyProfit
    : null;

  return Response.json({
    revenue: {
      daily: dailyRevenue,
      monthly: monthlyRevenue,
      yearly: yearlyRevenue,
    },
    costs: {
      electricity: {
        daily: dailyPowerCost,
        monthly: monthlyPowerCost,
        yearly: yearlyPowerCost,
      },
      hardware,
    },
    profit: {
      monthly: monthlyProfit,
      yearly: yearlyProfit,
    },
    breakEvenMonths,
    roi: yearlyProfit > 0 ? (yearlyProfit / hardware) : null,
  });
}