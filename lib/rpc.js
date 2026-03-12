// Central RPC helper placeholder.
// Real RPC utilities will be added later as needed.

export async function fetchPlaceholder(chain, address) {
  return {
    chain,
    address,
    nativeBalance: 0,
    symbol: "N/A",
    tokens: [],
    note: "Placeholder RPC helper – real RPC utilities will be added later."
  };
}
