// -----------------------------
// SOLANA
// -----------------------------
export async function fetchSolanaWallet(address) {
  const endpoint = "https://api.mainnet-beta.solana.com";
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [address],
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  const lamports = json.result?.value ?? 0;
  const sol = lamports / 1_000_000_000;

  return {
    chainType: "non-evm",
    chainKey: "solana",
    chainName: "Solana",
    symbol: "SOL",
    logo: "/logos/solana.png",
    address,
    nativeBalance: sol,
  };
}

// -----------------------------
// TON
// -----------------------------
export async function fetchTonWallet(address) {
  return {
    chainType: "non-evm",
    chainKey: "ton",
    chainName: "TON",
    symbol: "TON",
    logo: "/logos/ton.png",
    address,
    nativeBalance: 0, // TON API coming later
  };
}

// -----------------------------
// TRON
// -----------------------------
export async function fetchTronWallet(address) {
  return {
    chainType: "non-evm",
    chainKey: "tron",
    chainName: "TRON",
    symbol: "TRX",
    logo: "/logos/tron.png",
    address,
    nativeBalance: 0, // TRON API coming later
  };
}
