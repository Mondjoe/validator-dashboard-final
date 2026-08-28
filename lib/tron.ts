export async function connectTron() {
  if (typeof window === "undefined") return null;

  const tron = (window as any).tronWeb;

  if (!tron || !tron.ready) {
    throw new Error("TronLink not detected");
  }

  const address = tron.defaultAddress.base58;
  const balance = await tron.trx.getBalance(address);
  const trx = balance / 1e6; // SUN → TRX

  const network = tron.fullNode.host.includes("nile")
    ? "Nile Testnet"
    : "Mainnet";

  return {
    address,
    balance: trx.toFixed(4),
    network
  };
}