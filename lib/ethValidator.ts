export async function getEthValidatorMetrics(pubkey: string) {
  const res = await fetch(
    `https://beaconcha.in/api/v1/validator/${pubkey}`
  );

  const data = await res.json();

  if (!data || !data.data) throw new Error("Validator not found");

  return {
    index: data.data.index,
    balance: data.data.balance / 1e9,
    status: data.data.status,
    effectiveBalance: data.data.effectivebalance / 1e9,
    slashed: data.data.slashed,
    activationEpoch: data.data.activationepoch,
    exitEpoch: data.data.exitepoch,
  };
}