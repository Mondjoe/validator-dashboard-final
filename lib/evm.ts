export async function connectEvmWallet() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No EVM wallet detected (Rabby or MetaMask required)");
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const address = accounts[0];

  const chainIdHex = await window.ethereum.request({
    method: "eth_chainId",
  });

  const chainId = parseInt(chainIdHex, 16);

  const balanceHex = await window.ethereum.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  const balance = parseInt(balanceHex, 16) / 1e18;

  const network =
    {
      1: "Ethereum Mainnet",
      56: "BNB Chain",
      137: "Polygon",
      42161: "Arbitrum",
      10: "Optimism",
    }[chainId] || `Chain ${chainId}`;

  return {
    address,
    chainId,
    network,
    balance: balance.toFixed(4),
  };
}