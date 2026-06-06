export async function anchorToTon(tonUI: any, hash: string) {
  return await tonUI.sendTransaction({
    messages: [
      {
        address: "0:0000000000000000000000000000000000000000000000000000000000000000",
        amount: "0",
        payload: hash,
      },
    ],
    validUntil: Math.floor(Date.now() / 1000) + 300,
  });
}
