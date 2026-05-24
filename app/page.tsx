'use client'

import {
  mockPortfolioHistory,
  portfolioData,
  recentTransactions,
  tokenHoldings,
  chainDistribution
} from "@/lib/mockData";

import DashboardLayout from "@/components/ui/DashboardLayout";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <DashboardLayout>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Portfolio Value', value: '$68,421.05', change: '+4.8%', color: '#00F5FF' },
          { label: 'NFT Holdings Value', value: '$42,621.30', change: '+5.2%', color: '#8B5CF6' },
          { label: 'Total NFTs Owned', value: '12', change: '+0%', color: '#39FF14' },
          { label: 'All-Time P&L', value: '+$18,421.05', change: '+36.9%', color: '#FF6B00' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 fade-up"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${stat.color}20`,
              animationDelay: `${i * 80}ms`,
            }}
          >
            <div className="text-xs text-white/40 mb-2">{stat.label}</div>
            <div className="text-2xl font-bold font-mono mb-2" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="flex items-center gap-1" style={{ color: stat.color }}>
              <ArrowUpRight className="w-3 h-3" />
              <span className="text-xs font-mono">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Portfolio Performance Chart */}
        <div
          className="lg:col-span-2 rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}
        >
          <div className="mb-4">
            <h2 className="text-sm font-bold text-white">Portfolio Performance</h2>
            <p className="text-xs text-white/40">Last 5 months</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
  <AreaChart data={mockPortfolioHistory}>
    <defs>
      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3} />
        <stop offset="95%" stopColor="#00F5FF" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
    <XAxis
  dataKey="timestamp"
  stroke="rgba(255,255,255,0.3)"
  style={{ fontSize: '12px' }}
  tickFormatter={(t) => new Date(t).toLocaleDateString()}
/>
    <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: '12px' }} />
    <Tooltip
      contentStyle={{
        background: 'rgba(5,8,16,0.95)',
        border: '1px solid rgba(0,245,255,0.3)',
        borderRadius: '8px',
      }}
      labelStyle={{ color: '#00F5FF' }}
    />
    <Area type="monotone" dataKey="value" stroke="#00F5FF" fillOpacity={1} fill="url(#colorValue)" />
  </AreaChart>
</ResponsiveContainer>
        </div>

        {/* Chain Distribution */}
<div
  className="rounded-xl p-5"
  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.1)' }}
>
  <h2 className="text-sm font-bold text-white mb-4">Chain Distribution</h2>

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={chainDistribution}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        paddingAngle={2}
        dataKey="percent"
      >
        {chainDistribution.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          background: 'rgba(5,8,16,0.95)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: '8px',
        }}
      />
    </PieChart>
  </ResponsiveContainer>

  <div className="mt-4 space-y-2">
    {chainDistribution.map((chain) => (
      <div key={chain.name} className="flex justify-between">
        <span className="text-xs text-white/60">{chain.name}</span>
        <span className="text-xs font-mono text-white/80">{chain.percentage}%</span>
      </div>
    ))}
  </div>
     </div>
      {/* Recent Transactions & Token Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(57,255,20,0.1)' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-white">Recent Transactions</h2>
            <a href="/transactions" className="text-xs text-[#00F5FF] hover:text-[#00F5FF]/80">
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {recentTransactions.slice(0, 4).map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="px-2 py-1 rounded text-xs font-bold"
                    style={{
                      background: tx.type === 'BUY' ? 'rgba(57,255,20,0.2)' : tx.type === 'SELL' ? 'rgba(255,0,110,0.2)' : 'rgba(0,245,255,0.2)',
                      color: tx.type === 'BUY' ? '#39FF14' : tx.type === 'SELL' ? '#FF006E' : '#00F5FF',
                    }}
                  >
                    {tx.type}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white">{tx.name}</div>
                    <div className="text-[10px] text-white/40">{tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-white">{tx.amount}</div>
                  <div className={cn('text-[10px] font-mono', tx.status === 'Confirmed' ? 'text-[#39FF14]' : 'text-[#FF6B00]')}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Holdings */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,107,0,0.1)' }}
        >
          <h2 className="text-sm font-bold text-white mb-4">Token Holdings</h2>
          <div className="space-y-3">
            {tokenHoldings.slice(0, 5).map((token, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${token.color}20`, color: token.color }}>
                    {token.symbol[0]}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white">{token.symbol}</div>
                    <div className="text-[10px] text-white/40">{token.balance} {token.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-white">${token.value.toLocaleString()}</div>
                  <div className={cn('text-[10px] font-mono flex items-center justify-end gap-0.5', token.change >= 0 ? 'text-[#39FF14]' : 'text-[#FF006E]')}>
                    <TrendingUp className="w-3 h-3" />
                    {token.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
