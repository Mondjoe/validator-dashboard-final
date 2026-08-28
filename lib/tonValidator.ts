export async function getTonValidatorMetrics(address: string) {
  const res = await fetch(
    `https://toncenter.com/api/v2/getValidators?address=${address}`
  );

  const data = await res.json();

  if (!data || !data.result) throw new Error("TON validator not found");

  return {
    stake: data.result.stake / 1e9,
    round: data.result.round,
    status: data.result.status,
    rewards: data.result.rewards / 1e9,
  };
}