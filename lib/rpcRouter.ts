const RPC_PROVIDERS: Record<string, string[]> = {
  ethereum: [
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  ],
  optimism: [
    `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  ],
  base: [
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  ],
  xai: [
    `https://xai-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  ]
};
export async function rpcRequest(chain: string, body: any) {
  const providers = RPC_PROVIDERS[chain];
  if (!providers) throw new Error("Unknown chain");

  for (const url of providers) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      return json;
    } catch (err) {
      continue;
    }
  }

  throw new Error("All RPC providers failed");
}
