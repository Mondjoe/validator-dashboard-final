export function normalizeIdentity(id: any) {
  return {
    evm: id.evm?.address || null,
    solana: id.solana?.address || null,
    ton: id.ton?.address || null,
    tron: id.tron?.address || null,
  };
}
