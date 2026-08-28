export type ChainType = "EVM" | "TON" | "TRON";

export interface ActiveChainState {
  type: ChainType;
  name: string;
}

export const CHAINS = {
  EVM_MAINNET: { type: "EVM" as const, name: "Ethereum Mainnet" },
  TON_MAINNET: { type: "TON" as const, name: "TON Mainnet" },
  TRON_MAINNET: { type: "TRON" as const, name: "TRON Mainnet" },
};