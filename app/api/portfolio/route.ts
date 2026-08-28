export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const chain = searchParams.get("chain");
  const address = searchParams.get("address");

  if (!chain || !address) {
    return Response.json({ error: "Missing parameters" });
  }

  // 1. Price
  const priceRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/price?chain=${chain}`
  );
  const price = await priceRes.json();

  // 2. Rewards
  const rewardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/rewards?chain=${chain}&pubkey=${address}`
  );
  const rewards = await rewardRes.json();

  // 3. Wallet balance per chain
  let balance = 0;

  if (chain === "ETH") {
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}`
    );
    const data = await res.json();
    balance = Number(data.result) / 1e18;
  }

  if (chain === "TON") {
    const res = await fetch(
      `https://tonapi.io/v2/accounts/${address}`
    );
    const data = await res.json();
    balance = data.balance / 1e9;
  }

  if (chain === "TRON") {
    const res = await fetch(
      `https://api.trongrid.io/v1/accounts/${address}`
    );
    const data = await res.json();
    balance = (data.data?.[0]?.balance || 0) / 1e6;
  }

  return Response.json({
    balance,
    balanceUSD: balance * (price.price || 0),
    rewards,
    price: price.price,
  });
}