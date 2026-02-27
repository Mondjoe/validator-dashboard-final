import { ethers } from "ethers";

export const EVM_CHAINS = {
  ethereum: {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    rpc: "https://rpc.ankr.com/eth",
    logo: "/logos/ethereum.png",
  },
  bnb: {
    id: 56,
    name: "BNB Chain",
    symbol: "BNB",
    rpc: "https://bsc-dataseed.binance.org",
    logo: "/logos/bnb.png",
  },
  arbitrum: {
    id: 42161,
    name: "Arbitrum",
    symbol: "ETH",
    rpc: "https://arb1.arbitrum.io/rpc",
    logo: "/logos/arbitrum.png",
  },
  optimism: {
    id: 10,
    name: "Optimism",
    symbol: "ETH",
    rpc: "https://mainnet.optimism.io",
    logo: "/logos/optimism.png",
  },
  polygon: {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    rpc: "https://polygon-rpc.com",
    logo: "/logos/polygon.png",
  },
  avalanche: {
    id: 43114,
    name: "Avalanche",
    symbol: "AVAX",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    logo: "/logos/avalanche.png",
  },
  base: {
    id: 8453,
    name: "Base",
    symbol: "ETH",
    rpc: "https://mainnet.base.org",
    logo: "/logos/base.png",
  },
  scroll: {
    id: 534352,
    name: "Scroll",
    symbol: "ETH",
    rpc: "https://rpc.scroll.io",
    logo: "/logos/scroll.png",
  },
  zksync: {
    id: 324,
    name: "zkSync",
    symbol: "ETH",
    rpc: "https://mainnet.era.zksync.io",
    logo: "/logos/zksync.png",
  },
};

export async function fetchEvmWallet(chainKey, address) {
  const chain = EVM_CHAINS[chainKey];
  if (!chain) throw new Error("Unsupported EVM chain");

  const provider = new ethers.JsonRpcProvider(chain.rpc);
  const balanceWei = await provider.getBalance(address);
  const balance = Number(ethers.formatEther(balanceWei));

  return {
    chainType: "evm",
    chainKey,
    chainName: chain.name,
    symbol: chain.symbol,
    logo: chain.logo,
    address,
    nativeBalance: balance,
  };
}

