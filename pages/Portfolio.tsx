"use client";

import DashboardLayout from "@/components/ui/DashboardLayout";
import { mockTokens, mockPortfolioHistory, portfolioStats, chainStats } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight, TrendingUp } from 'lucide-react';
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

export default function Portfolio() {
  return (
    <DashboardLayout title="Portfolio" subtitle="Token holdings, allocation, and performance">
      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Value', value: `$${portfolioStats.totalValue.toLocaleString()}`, change: portfolioStats.totalValueChange24h, color: '#00F5FF' },
          { label: 'Token Value', value: `$${portfolioStats.tokenValue.toLocaleString()}`, change: 3.1, color: '#8B5CF6' },
          { label: 'NFT Value', value: `$${portfolioStats.nftValue.toLocaleString()}`, change: 5.2, color: '#39FF14' },
          { label: 'All-Time P&L', value: `+$${portfolioStats.profitLoss.toLocaleString()}`, change: portfolioStats.profitLossPercent, color: '#39FF14' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${stat.color}20` }}
          >
            <div className="text-sm font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {stat.change >= 0
                ? <ArrowUpRight className="w-3 h-3 text-[#39FF14]" />
                : <ArrowDownRight className="w-3 h-3 text-[#FF006E]" />}
              <span className={cn('text-[10px] font-mono', stat.change >= 0 ? 'text-[#39FF14]' : 'text-[#FF006E]')}>
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </span>
              <span className="text-[10px] text-white/30">24h</span>
            </div>
            <div className="text-[10px] text-white/40 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Portfolio history */}
        <div
          className="col-span-12 lg:col-span-8 rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.12)' }}
        >
          <h2 className="text-sm font-bold text-white mb-4">Portfolio History</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mockPortfolioHistory}>
              <defs>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} width={45} />
              <Tooltip
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']}
                contentStyle={{ background: '#0A0F1E', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#grad2)" dot={false} activeDot={{ r: 4, fill: '#8B5CF6', stroke: '#050810', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Allocation */}
        <div
          className="col-span-12 lg:col-span-4 rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.12)' }}
        >
          <h2 className="text-sm font-bold text-white mb-4">Chain Allocation</h2>
          <div className="flex justify-center mb-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={chainStats} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {chainStats.map((entry, i) => <Cell key={i} fill={entry.color} opacity={0.9} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} contentStyle={{ background: '#0A0F1E', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {chainStats.map(c => (
              <div key={c.chain} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-white/60">{c.chain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/80">${c.value.toLocaleString()}</span>
                  <span className="text-[10px] text-white/40">{c.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Token table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}
      >
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-bold text-white">Token Holdings</h2>
        </div>
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.04] text-[10px] font-bold text-white/30 uppercase tracking-wider">
          <div className="col-span-3">Asset</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Balance</div>
          <div className="col-span-2">Value</div>
          <div className="col-span-2">24h Change</div>
          <div className="col-span-1">Chain</div>
        </div>
        {mockTokens.map((token, i) => (
          <div
            key={token.id}
            className={cn(
              'grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors',
              i !== mockTokens.length - 1 && 'border-b border-white/[0.04]'
            )}
          >
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-base">
                {token.logo}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{token.symbol}</div>
                <div className="text-[10px] text-white/40">{token.name}</div>
              </div>
            </div>
            <div className="col-span-2 text-xs font-mono text-white/70">${token.price.toLocaleString()}</div>
            <div className="col-span-2 text-xs font-mono text-white/70">{token.balance} {token.symbol}</div>
            <div className="col-span-2 text-xs font-mono text-white/90">${token.value.toLocaleString()}</div>
            <div className="col-span-2">
              <span className={cn(
                'flex items-center gap-0.5 text-xs font-mono',
                token.change24h >= 0 ? 'text-[#39FF14]' : 'text-[#FF006E]'
              )}>
                {token.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(token.change24h)}%
              </span>
            </div>
            <div className="col-span-1 text-[10px] text-white/40">{token.chain.slice(0, 4)}</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
