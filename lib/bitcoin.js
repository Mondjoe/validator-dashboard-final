export async function fetchBitcoinWallet(address) {
  try {
    const endpoint = `https://mempool.space/api/address/${address}`;
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error("BTC API error");
    }

    const json = await res.json();

    const funded = json.chain_stats?.funded_txo_sum ?? 0;
    const spent = json.chain_stats?.spent_txo_sum ?? 0;
    const sats = funded - spent;
    const btc = sats / 100_000_000;

    return {
      chainType: "bitcoin",
      chainKey: "bitcoin",
      chainName: "Bitcoin",
      symbol: "BTC",
      logo: "/logos/bitcoin.png",
      address,
      nativeBalance: btc,
    };
  } catch (e) {
    return {
      chainType: "bitcoin",
      chainKey: "bitcoin",
      chainName: "Bitcoin",
      symbol: "BTC",
      logo: "/logos/bitcoin.png",
      address,
      nativeBalance: 0,
      error: e.message,
    };
  }
}

