"use client";

import DashboardLayout from "@/components/ui/DashboardLayout";
import {
  mockNFTs,
  mockTransactions,
  mockPortfolioHistory,
  mockTokens,
  portfolioStats,
  chainStats,
} from '@/lib/mockData';
import { cn } from '@/lib/utils';
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  TrendingUp,
  Wallet,
  Image,
  Activity,
  Layers,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { toast } from 'sonner';

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  accent = 'cyan',
  prefix = '',
  suffix = '',
  delay = 0,
}: {
  title: string;
  value: number;
  change?: number;
  icon: React.ElementType;
  accent?: 'cyan' | 'purple' | 'green' | 'magenta';
  prefix?: string;
  suffix?: string;
  delay?: number;
}) {
  const displayValue = useCountUp(value, 1200 + delay);
  const accentMap = {
    cyan: { color: '#00F5FF', bg: 'rgba(0,245,255,0.08)', border: 'rgba(0,245,255,0.2)' },
    purple: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
    green: { color: '#39FF14', bg: 'rgba(57,255,20,0.08)', border: 'rgba(57,255,20,0.2)' },
    magenta: { color: '#FF006E', bg: 'rgba(255,0,110,0.08)', border: 'rgba(255,0,110,0.2)' },
  };
  const a = accentMap[accent];

  return (
    <div
      className="relative rounded-xl p-5 overflow-hidden fade-up"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${a.border}`,
        boxShadow: `0 0 20px ${a.bg}`,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Glow corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 blur-2xl pointer-events-none"
        style={{ background: a.color, transform: 'translate(30%, -30%)' }}
      />

      <div className="flex items-start justify-between mb-3">
        <div
          className="p-2 rounded-lg"
          style={{ background: a.bg }}
        >
          <Icon className="w-4 h-4" style={{ color: a.color }} />
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
            change >= 0 ? 'text-[#39FF14] bg-[rgba(57,255,20,0.1)]' : 'text-[#FF006E] bg-[rgba(255,0,110,0.1)]'
          )}>
            {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>

      <div className="font-mono text-2xl font-bold text-white mb-1">
        {prefix}{value >= 1000
          ? (displayValue >= 1000 ? (displayValue / 1000).toFixed(1) + 'K' : displayValue.toFixed(0))
          : displayValue.toFixed(value < 10 ? 2 : 0)}{suffix}
      </div>
      <div className="text-xs text-white/40 font-medium">{title}</div>
    </div>
  );
}

const txTypeConfig = {
  buy: { label: 'BUY', color: '#39FF14', bg: 'rgba(57,255,20,0.1)' },
  sell: { label: 'SELL', color: '#FF006E', bg: 'rgba(255,0,110,0.1)' },
  transfer: { label: 'XFER', color: '#00F5FF', bg: 'rgba(0,245,255,0.1)' },
  mint: { label: 'MINT', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
  stake: { label: 'STAKE', color: '#FF6B00', bg: 'rgba(255,107,0,0.1)' },
  unstake: { label: 'UNSTK', color: '#FF6B00', bg: 'rgba(255,107,0,0.1)' },
};

function formatTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0F1E] border border-[rgba(0,245,255,0.2)] rounded-lg p-3 shadow-xl">
        <div className="text-xs text-white/50 mb-1">{label}</div>
        <div className="text-sm font-bold text-[#00F5FF] font-mono">
          ${payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

export default function Home() {
  const recentTxs = mockTransactions.slice(0, 6);
  const featuredNFTs = mockNFTs.slice(0, 6);

  return (
    <DashboardLayout title="Dashboard" subtitle="Portfolio overview & analytics">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Portfolio Value"
          value={portfolioStats.totalValue}
          change={portfolioStats.totalValueChange24h}
          icon={Wallet}
          accent="cyan"
          prefix="$"
          delay={0}
        />
        <StatCard
          title="NFT Holdings Value"
          value={portfolioStats.nftValue}
          change={5.2}
          icon={Image}
          accent="purple"
          prefix="$"
          delay={80}
        />
        <StatCard
          title="Total NFTs Owned"
          value={portfolioStats.totalNFTs}
          icon={Layers}
          accent="green"
          delay={160}
        />
        <StatCard
          title="All-Time P&L"
          value={portfolioStats.profitLoss}
          change={portfolioStats.profitLossPercent}
          icon={TrendingUp}
          accent="magenta"
          prefix="$"
          delay={240}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Portfolio Chart — spans 8 cols */}
        <div
          className="col-span-12 lg:col-span-8 rounded-xl p-5"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(0,245,255,0.12)',
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-white">Portfolio Performance</h2>
              <p className="text-xs text-white/40 mt-0.5">Last 5 months</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white font-mono">
                ${portfolioStats.totalValue.toLocaleString()}
              </span>
              <span className="text-xs text-[#39FF14] flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                {portfolioStats.totalValueChange24h}%
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockPortfolioHistory} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00F5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
                interval={3}
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00F5FF"
                strokeWidth={2}
                fill="url(#portfolioGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#00F5FF', stroke: '#050810', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chain Distribution — spans 4 cols */}
        <div
          className="col-span-12 lg:col-span-4 rounded-xl p-5"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(139,92,246,0.12)',
          }}
        >
          <h2 className="text-sm font-bold text-white mb-1">Chain Distribution</h2>
          <p className="text-xs text-white/40 mb-4">Portfolio by network</p>
          <div className="flex justify-center mb-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={chainStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chainStats.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.9} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  contentStyle={{
                    background: '#0A0F1E',
                    border: '1px solid rgba(0,245,255,0.2)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {chainStats.map((chain) => (
              <div key={chain.chain} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chain.color }} />
                  <span className="text-xs text-white/60">{chain.chain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/80">${chain.value.toLocaleString()}</span>
                  <span className="text-[10px] text-white/40">{chain.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom grid: Transactions + Tokens + NFT strip */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Recent Transactions */}
        <div
          className="col-span-12 lg:col-span-7 rounded-xl p-5"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(0,245,255,0.1)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent Transactions</h2>
            <button
              onClick={() => toast.info('View all transactions', { description: 'Navigate to Transactions page' })}
              className="text-[10px] text-[#00F5FF]/60 hover:text-[#00F5FF] flex items-center gap-1 transition-colors"
            >
              View all <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {recentTxs.map((tx) => {
              const cfg = txTypeConfig[tx.type];
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors group"
                >
                  <div
                    className="px-2 py-0.5 rounded text-[10px] font-bold font-mono flex-shrink-0"
                    style={{ color: cfg.color, background: cfg.bg }}
                  >
                    {cfg.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white/80 truncate">
                      {tx.nftName || `${tx.amount} ${tx.currency}`}
                    </div>
                    <div className="text-[10px] text-white/30 font-mono">{tx.hash}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-mono text-white/70">
                      {tx.amount} {tx.currency}
                    </div>
                    <div className="text-[10px] text-white/30">{formatTime(tx.timestamp)}</div>
                  </div>
                  <div className={cn(
                    'w-1.5 h-1.5 rounded-full flex-shrink-0',
                    tx.status === 'confirmed' ? 'bg-[#39FF14]' :
                    tx.status === 'pending' ? 'bg-[#FF6B00] animate-pulse' : 'bg-[#FF006E]'
                  )} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Token Holdings */}
        <div
          className="col-span-12 lg:col-span-5 rounded-xl p-5"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(139,92,246,0.1)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Token Holdings</h2>
            <Activity className="w-4 h-4 text-white/20" />
          </div>
          <div className="space-y-2.5">
            {mockTokens.slice(0, 5).map((token) => (
              <div key={token.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-sm flex-shrink-0">
                  {token.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{token.symbol}</span>
                    <span className="text-xs font-mono text-white/80">${token.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-white/40 font-mono">{token.balance} {token.symbol}</span>
                    <span className={cn(
                      'text-[10px] font-mono',
                      token.change24h >= 0 ? 'text-[#39FF14]' : 'text-[#FF006E]'
                    )}>
                      {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                    </span>
                  </div>
                  {/* Mini bar */}
                  <div className="mt-1 h-0.5 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(token.value / portfolioStats.totalValue) * 100}%`,
                        background: token.change24h >= 0 ? '#00F5FF' : '#FF006E',
                        opacity: 0.6,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NFT Strip */}
      <div
        className="rounded-xl p-5"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(139,92,246,0.12)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white">NFT Collection</h2>
            <p className="text-xs text-white/40 mt-0.5">{portfolioStats.totalNFTs} items across 4 chains</p>
          </div>
          <button
            onClick={() => toast.info('Navigate to NFT Gallery', { description: 'Click NFT Gallery in the sidebar' })}
            className="text-[10px] text-[#8B5CF6]/60 hover:text-[#8B5CF6] flex items-center gap-1 transition-colors"
          >
            View all <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {featuredNFTs.map((nft) => {
            const rarityColors: Record<string, string> = {
              Common: '#888',
              Uncommon: '#39FF14',
              Rare: '#00F5FF',
              Epic: '#8B5CF6',
              Legendary: '#FF6B00',
            };
            return (
              <div
                key={nft.id}
                className="nft-card rounded-xl overflow-hidden cursor-pointer group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onClick={() => toast.info(nft.name, {
                  description: `${nft.price} ${nft.currency} · ${nft.rarity} · ${nft.chain}`,
                })}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 right-1.5">
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        color: rarityColors[nft.rarity],
                        background: `${rarityColors[nft.rarity]}20`,
                        border: `1px solid ${rarityColors[nft.rarity]}40`,
                      }}
                    >
                      {nft.rarity[0]}
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-[10px] font-bold text-white/80 truncate">{nft.name}</div>
                  <div className="text-[9px] text-white/40 truncate">{nft.collection}</div>
                  <div className="text-[10px] font-mono text-[#00F5FF] mt-0.5">
                    {nft.price} {nft.currency}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
