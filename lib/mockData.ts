export const recentTransactions = [
  {
    type: "BUY",
    name: "ETH",
    time: "2 hours ago",
    amount: "+0.52 ETH",
    status: "Confirmed"
  },
  {
    type: "SELL",
    name: "SOL",
    time: "5 hours ago",
    amount: "-12.4 SOL",
    status: "Confirmed"
  },
  {
    type: "TRANSFER",
    name: "USDC",
    time: "1 day ago",
    amount: "+250 USDC",
    status: "Pending"
  },
  {
    type: "BUY",
    name: "BTC",
    time: "3 days ago",
    amount: "+0.003 BTC",
    status: "Confirmed"
  }
];

export const mockPortfolioHistory = [
  { timestamp: Date.now() - 86400_000, value: 11000 },
  { timestamp: Date.now(), value: 12345 },
];