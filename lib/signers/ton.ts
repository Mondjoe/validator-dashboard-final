import { TonConnectUI } from "@tonconnect/ui-react";

export async function signTon(tonUI: TonConnectUI, message: string) {
  const result = await tonUI.sendTransaction({
    messages: [],
    validUntil: Math.floor(Date.now() / 1000) + 300,
    stateInit: undefined,
    payload: message,
  });

  return result.boc;
}
