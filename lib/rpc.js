// Placeholder for future real RPC helpers.
// Later we will add real Solana / EVM / TON / TRON / BTC RPC calls here.
export async function fetchPlaceholder(chain, address) {
  return {
    address,
    chain,
    nativeBalance: 0,
    symbol: 'N/A',
    tokens: [],
    note: 'Placeholder data – RPC wiring will be added next step.'
  };
}
