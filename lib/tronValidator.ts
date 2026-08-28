export async function getTronValidatorMetrics(address: string) {
  const res = await fetch(
    `https://apilist.tronscanapi.com/api/witness?address=${address}`
  );

  const data = await res.json();

  if (!data || !data.data || data.data.length === 0)
    throw new Error("TRON validator not found");

  const v = data.data[0];

  return {
    name: v.name,
    votes: v.votes,
    url: v.url,
    rank: v.rank,
    blocksProduced: v.totalProduced,
    rewards: v.totalReward / 1e6,
  };
}