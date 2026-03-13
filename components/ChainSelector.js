export default function ChainSelector() {
  return null;
}

export const CHAINS = [
  { key: "ethereum", label: "Ethereum (EVM)" },
  { key: "bnb", label: "BNB Chain (EVM)" },
  { key: "arbitrum", label: "Arbitrum (EVM)" },
  { key: "optimism", label: "Optimism (EVM)" },
  { key: "polygon", label: "Polygon (EVM)" },
  { key: "avalanche", label: "Avalanche (EVM)" },
  { key: "base", label: "Base (EVM)" },
  { key: "scroll", label: "Scroll (EVM)" },
  { key: "zksync", label: "zkSync (EVM)" },

  { key: "solana", label: "Solana" },
  { key: "ton", label: "TON" },
  { key: "tron", label: "TRON" },
  { key: "sui", label: "Sui" },

  { key: "bitcoin", label: "Bitcoin" },
];
