// Mock contract activity
export const mockContractActivity = [
  { id: 1, contract: "0xABC123", action: "Swap", amount: 1.2, chain: "ETH" },
  { id: 2, contract: "0xDEF456", action: "Stake", amount: 50, chain: "SOL" },
];

// Mock gas history
export const mockGasHistory = [
  { timestamp: Date.now() - 3600_000, gas: 32 },
  { timestamp: Date.now(), gas: 28 },
];

// Mock transactions
export const mockTransactions = [
  { id: 1, hash: "0xaaa", amount: 0.5, chain: "ETH" },
  { id: 2, hash: "0xbbb", amount: 2.1, chain: "BNB" },
];

// Mock NFTs
export const mockNFTs = [
  { id: 1, name: "CryptoPunk #123", chain: "ETH" },
  { id: 2, name: "DeGod #88", chain: "SOL" },
];

// Portfolio stats
export const portfolioStats = {
  totalValue: 12345,
  dailyChange: 2.5,
  weeklyChange: -1.2,
};

// Chain stats
export const chainStats = [
  { chain: "ETH", value: 6000 },
  { chain: "SOL", value: 2000 },
  { chain: "BNB", value: 1500 },
];

// Mock tokens
export const mockTokens = [
  { symbol: "ETH", balance: 1.23, price: 3200, color: "#00F5FF", value: 3936, change: 2.5 },
  { symbol: "SOL", balance: 50, price: 150, color: "#8B5CF6", value: 7500, change: -1.2 },
];

// Portfolio history
export const mockPortfolioHistory = [
  { timestamp: Date.now() - 86400_000, value: 11000 },
  { timestamp: Date.now(), value: 12345 },
];

// Wallet address
export const walletAddressFull = "0x1234567890abcdef1234567890abcdef12345678";

// Portfolio data
export const portfolioData = {
  totalValue: 12345,
  tokens: mockTokens,
};

// Chain distribution
export const chainDistribution = [
  { chain: "ETH", percent: 60, color: "#00F5FF" },
  { chain: "SOL", percent: 25, color: "#8B5CF6" },
  { chain: "BNB", percent: 15, color: "#FF6B00" },
];

// Recent transactions
export const recentTransactions = [
  { type: "BUY", name: "ETH", time: "2 hours ago", amount: "+0.52 ETH", status: "Confirmed" },
  { type: "SELL", name: "SOL", time: "5 hours ago", amount: "-12.4 SOL", status: "Confirmed" },
  { type: "TRANSFER", name: "USDC", time: "1 day ago", amount: "+250 USDC", status: "Pending" },
  { type: "BUY", name: "BTC", time: "3 days ago", amount: "+0.003 BTC", status: "Confirmed" },
];

// Token holdings
export const tokenHoldings = mockTokens;
