export async function anchorToTron(hash: string) {
  const tronWeb = (window as any).tronWeb;
  return await tronWeb.trx.sendTransaction(
    "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
    0,
    `0x${hash}`
  );
}
