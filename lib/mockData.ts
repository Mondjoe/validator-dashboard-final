// Mock data for Web3 NFT Dashboard
// Cyberpunk Noir theme — all demo data

export interface NFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  price: number;
  currency: string;
  chain: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  lastSale: number;
  change24h: number;
  tokenId: string;
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  balance: number;
  value: number;
  change24h: number;
  chain: string;
  logo: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer' | 'mint' | 'stake' | 'unstake';
  hash: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'confirmed' | 'pending' | 'failed';
  chain: string;
  gasUsed: number;
  nftName?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  eth?: number;
}

export interface StakingPool {
  id: string;
  name: string;
  protocol: string;
  apy: number;
  tvl: number;
  staked: number;
  rewards: number;
  chain: string;
  token: string;
}

export interface ContractActivity {
  id: string;
  contract: string;
  method: string;
  chain: string;
  timestamp: Date;
  gasUsed: number;
  status: 'success' | 'reverted';
  value: number;
}

// NFT Collection images using Unsplash
const nftImages = [
  'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=400&q=80',
  'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&q=80',
  'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&q=80',
  'https://images.unsplash.com/photo-1643101808200-0d159c1331f9?w=400&q=80',
  'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=400&q=80',
  'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&q=80',
  'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=400&q=80',
  'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&q=80',
  'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?w=400&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&q=80',
  'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=400&q=80',
];

export const mockNFTs: NFT[] = [
  { id: '1', name: 'CyberApe #4821', collection: 'CyberApes', image: nftImages[0], price: 2.4, currency: 'ETH', chain: 'Ethereum', rarity: 'Rare', lastSale: 2.1, change24h: 14.3, tokenId: '4821' },
  { id: '2', name: 'Neon Punk #0077', collection: 'NeonPunks', image: nftImages[1], price: 8.9, currency: 'ETH', chain: 'Ethereum', rarity: 'Legendary', lastSale: 7.5, change24h: 18.7, tokenId: '0077' },
  { id: '3', name: 'PixelDragon #312', collection: 'PixelDragons', image: nftImages[2], price: 0.85, currency: 'ETH', chain: 'Polygon', rarity: 'Uncommon', lastSale: 0.92, change24h: -7.6, tokenId: '312' },
  { id: '4', name: 'VoidWalker #1337', collection: 'VoidWalkers', image: nftImages[3], price: 4.2, currency: 'ETH', chain: 'Ethereum', rarity: 'Epic', lastSale: 3.8, change24h: 10.5, tokenId: '1337' },
  { id: '5', name: 'SolGhost #892', collection: 'SolGhosts', image: nftImages[4], price: 45.0, currency: 'SOL', chain: 'Solana', rarity: 'Legendary', lastSale: 38.0, change24h: 18.4, tokenId: '892' },
  { id: '6', name: 'MetaBot #2209', collection: 'MetaBots', image: nftImages[5], price: 1.1, currency: 'ETH', chain: 'Polygon', rarity: 'Common', lastSale: 1.0, change24h: 10.0, tokenId: '2209' },
  { id: '7', name: 'DarkMatter #55', collection: 'DarkMatter', image: nftImages[6], price: 12.5, currency: 'ETH', chain: 'Ethereum', rarity: 'Legendary', lastSale: 11.0, change24h: 13.6, tokenId: '55' },
  { id: '8', name: 'BNBMonster #7701', collection: 'BNBMonsters', image: nftImages[7], price: 1.8, currency: 'BNB', chain: 'BNB Chain', rarity: 'Rare', lastSale: 1.6, change24h: 12.5, tokenId: '7701' },
  { id: '9', name: 'AstralBeing #404', collection: 'AstralBeings', image: nftImages[8], price: 3.3, currency: 'ETH', chain: 'Ethereum', rarity: 'Epic', lastSale: 3.1, change24h: 6.5, tokenId: '404' },
  { id: '10', name: 'CryptoKitten #9', collection: 'CryptoKittens', image: nftImages[9], price: 0.45, currency: 'ETH', chain: 'Ethereum', rarity: 'Common', lastSale: 0.48, change24h: -6.3, tokenId: '9' },
  { id: '11', name: 'NeonSamurai #111', collection: 'NeonSamurai', image: nftImages[10], price: 6.7, currency: 'ETH', chain: 'Ethereum', rarity: 'Epic', lastSale: 5.9, change24h: 13.6, tokenId: '111' },
  { id: '12', name: 'MaticWarrior #500', collection: 'MaticWarriors', image: nftImages[11], price: 220.0, currency: 'MATIC', chain: 'Polygon', rarity: 'Rare', lastSale: 195.0, change24h: 12.8, tokenId: '500' },
];

export const mockTokens: Token[] = [
  { id: '1', symbol: 'ETH', name: 'Ethereum', price: 3842.50, balance: 4.821, value: 18523.19, change24h: 3.2, chain: 'Ethereum', logo: '⟠' },
  { id: '2', symbol: 'SOL', name: 'Solana', price: 182.30, balance: 45.0, value: 8203.50, change24h: 5.8, chain: 'Solana', logo: '◎' },
  { id: '3', symbol: 'BNB', name: 'BNB', price: 612.40, balance: 8.5, value: 5205.40, change24h: -1.2, chain: 'BNB Chain', logo: '⬡' },
  { id: '4', symbol: 'MATIC', name: 'Polygon', price: 0.892, balance: 4200.0, value: 3746.40, change24h: 2.1, chain: 'Polygon', logo: '⬟' },
  { id: '5', symbol: 'LINK', name: 'Chainlink', price: 18.45, balance: 120.0, value: 2214.00, change24h: 4.5, chain: 'Ethereum', logo: '⬡' },
  { id: '6', symbol: 'UNI', name: 'Uniswap', price: 11.20, balance: 85.0, value: 952.00, change24h: -2.8, chain: 'Ethereum', logo: '🦄' },
  { id: '7', symbol: 'AAVE', name: 'Aave', price: 142.80, balance: 5.2, value: 742.56, change24h: 1.9, chain: 'Ethereum', logo: '👻' },
];

export const mockTransactions: Transaction[] = [
  { id: '1', type: 'buy', hash: '0x4f8a...c3d1', from: '0xDead...Beef', to: '0x1234...5678', amount: 2.4, currency: 'ETH', timestamp: new Date(Date.now() - 1000 * 60 * 15), status: 'confirmed', chain: 'Ethereum', gasUsed: 0.0024, nftName: 'CyberApe #4821' },
  { id: '2', type: 'sell', hash: '0x9b2c...f4e8', from: '0x1234...5678', to: '0xABCD...EF01', amount: 8.9, currency: 'ETH', timestamp: new Date(Date.now() - 1000 * 60 * 45), status: 'confirmed', chain: 'Ethereum', gasUsed: 0.0031, nftName: 'Neon Punk #0077' },
  { id: '3', type: 'transfer', hash: '0x7e1d...a2b9', from: '0x1234...5678', to: '0x9876...DCBA', amount: 1.5, currency: 'ETH', timestamp: new Date(Date.now() - 1000 * 60 * 120), status: 'confirmed', chain: 'Ethereum', gasUsed: 0.0018 },
  { id: '4', type: 'mint', hash: '0x3c5f...8d7e', from: '0x0000...0000', to: '0x1234...5678', amount: 0.08, currency: 'ETH', timestamp: new Date(Date.now() - 1000 * 60 * 180), status: 'confirmed', chain: 'Ethereum', gasUsed: 0.0089, nftName: 'VoidWalker #1337' },
  { id: '5', type: 'stake', hash: '0x6a4b...1c2d', from: '0x1234...5678', to: '0xSTAKE...POOL', amount: 500, currency: 'MATIC', timestamp: new Date(Date.now() - 1000 * 60 * 240), status: 'confirmed', chain: 'Polygon', gasUsed: 0.0012 },
  { id: '6', type: 'buy', hash: '0x2e9f...5a6b', from: '0xDead...Beef', to: '0x1234...5678', amount: 45.0, currency: 'SOL', timestamp: new Date(Date.now() - 1000 * 60 * 300), status: 'confirmed', chain: 'Solana', gasUsed: 0.000025, nftName: 'SolGhost #892' },
  { id: '7', type: 'transfer', hash: '0x8d3c...7f1e', from: '0x1234...5678', to: '0xFEED...FACE', amount: 2.1, currency: 'BNB', timestamp: new Date(Date.now() - 1000 * 60 * 420), status: 'pending', chain: 'BNB Chain', gasUsed: 0.0005 },
  { id: '8', type: 'unstake', hash: '0x1b7a...4e9c', from: '0xSTAKE...POOL', to: '0x1234...5678', amount: 250, currency: 'MATIC', timestamp: new Date(Date.now() - 1000 * 60 * 600), status: 'confirmed', chain: 'Polygon', gasUsed: 0.0009 },
  { id: '9', type: 'buy', hash: '0x5c2d...9b4f', from: '0xDead...Beef', to: '0x1234...5678', amount: 1.1, currency: 'ETH', timestamp: new Date(Date.now() - 1000 * 60 * 720), status: 'failed', chain: 'Ethereum', gasUsed: 0.0021, nftName: 'MetaBot #2209' },
  { id: '10', type: 'mint', hash: '0xa4e8...3c1b', from: '0x0000...0000', to: '0x1234...5678', amount: 0.15, currency: 'ETH', timestamp: new Date(Date.now() - 1000 * 60 * 900), status: 'confirmed', chain: 'Ethereum', gasUsed: 0.0112, nftName: 'DarkMatter #55' },
];

export const mockPortfolioHistory: ChartDataPoint[] = [
  { date: 'Jan 1', value: 28500, eth: 7.2 },
  { date: 'Jan 8', value: 31200, eth: 7.8 },
  { date: 'Jan 15', value: 29800, eth: 7.5 },
  { date: 'Jan 22', value: 34500, eth: 8.1 },
  { date: 'Feb 1', value: 38200, eth: 9.2 },
  { date: 'Feb 8', value: 36800, eth: 8.9 },
  { date: 'Feb 15', value: 41500, eth: 9.8 },
  { date: 'Feb 22', value: 39200, eth: 9.3 },
  { date: 'Mar 1', value: 44800, eth: 10.5 },
  { date: 'Mar 8', value: 48200, eth: 11.2 },
  { date: 'Mar 15', value: 45600, eth: 10.8 },
  { date: 'Mar 22', value: 52100, eth: 12.1 },
  { date: 'Apr 1', value: 49800, eth: 11.6 },
  { date: 'Apr 8', value: 55400, eth: 12.8 },
  { date: 'Apr 15', value: 58900, eth: 13.5 },
  { date: 'Apr 22', value: 54200, eth: 12.7 },
  { date: 'May 1', value: 61500, eth: 14.2 },
  { date: 'May 8', value: 65800, eth: 15.1 },
  { date: 'May 14', value: 68421, eth: 15.8 },
];

export const mockGasHistory: ChartDataPoint[] = [
  { date: '00:00', value: 18 },
  { date: '02:00', value: 14 },
  { date: '04:00', value: 12 },
  { date: '06:00', value: 15 },
  { date: '08:00', value: 28 },
  { date: '10:00', value: 45 },
  { date: '12:00', value: 52 },
  { date: '14:00', value: 48 },
  { date: '16:00', value: 55 },
  { date: '18:00', value: 62 },
  { date: '20:00', value: 44 },
  { date: '22:00', value: 32 },
  { date: '24:00', value: 22 },
];

export const mockStakingPools: StakingPool[] = [
  { id: '1', name: 'ETH 2.0 Staking', protocol: 'Lido', apy: 4.2, tvl: 28500000000, staked: 2.5, rewards: 0.021, chain: 'Ethereum', token: 'ETH' },
  { id: '2', name: 'MATIC Staking', protocol: 'Polygon', apy: 8.7, tvl: 1200000000, staked: 2000, rewards: 43.5, chain: 'Polygon', token: 'MATIC' },
  { id: '3', name: 'AAVE Lending', protocol: 'Aave', apy: 3.8, tvl: 8900000000, staked: 5.2, rewards: 0.049, chain: 'Ethereum', token: 'AAVE' },
  { id: '4', name: 'SOL Staking', protocol: 'Marinade', apy: 6.5, tvl: 4500000000, staked: 20.0, rewards: 0.325, chain: 'Solana', token: 'SOL' },
];

export const mockContractActivity: ContractActivity[] = [
  { id: '1', contract: '0xBC4C...A8F2 (OpenSea)', method: 'fulfillBasicOrder', chain: 'Ethereum', timestamp: new Date(Date.now() - 1000 * 60 * 15), gasUsed: 145230, status: 'success', value: 2.4 },
  { id: '2', contract: '0x7a25...3B9D (Uniswap V3)', method: 'exactInputSingle', chain: 'Ethereum', timestamp: new Date(Date.now() - 1000 * 60 * 90), gasUsed: 98450, status: 'success', value: 0.5 },
  { id: '3', contract: '0x4E15...C2A1 (Lido)', method: 'submit', chain: 'Ethereum', timestamp: new Date(Date.now() - 1000 * 60 * 240), gasUsed: 87320, status: 'success', value: 2.5 },
  { id: '4', contract: '0x9F3B...7E4C (Blur)', method: 'execute', chain: 'Ethereum', timestamp: new Date(Date.now() - 1000 * 60 * 360), gasUsed: 212450, status: 'reverted', value: 0 },
  { id: '5', contract: '0x2C8A...5D1F (Aave)', method: 'deposit', chain: 'Ethereum', timestamp: new Date(Date.now() - 1000 * 60 * 480), gasUsed: 156780, status: 'success', value: 5.2 },
];

export const walletAddress = '0x1234...5678AbCd';
export const walletAddressFull = '0x1234567890AbCdEf1234567890AbCdEf12345678';

export const portfolioStats = {
  totalValue: 68421.05,
  totalValueChange24h: 4.8,
  nftValue: 42580.00,
  tokenValue: 25841.05,
  totalNFTs: 12,
  totalTransactions: 847,
  gasSpent: 0.842,
  profitLoss: 18421.05,
  profitLossPercent: 36.9,
};

export const chainStats = [
  { chain: 'Ethereum', value: 45820, color: '#627EEA', percentage: 67 },
  { chain: 'Solana', value: 12450, color: '#9945FF', percentage: 18 },
  { chain: 'Polygon', value: 6820, color: '#8247E5', percentage: 10 },
  { chain: 'BNB Chain', value: 3331, color: '#F3BA2F', percentage: 5 },
];
