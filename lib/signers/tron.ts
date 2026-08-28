export async function signTron(message: string) {
  const tronWeb = (window as any).tronWeb;
  if (!tronWeb) throw new Error("TronLink not available");

  return await tronWeb.trx.sign(message);
}
