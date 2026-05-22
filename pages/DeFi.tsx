/*
 * DESIGN: Cyberpunk Noir — DeFi / Staking
 * - Staking pool cards with APY gauges
 * - Reward tracking with neon accents
 * - Protocol logos and chain indicators
 */

import DashboardLayout from '@/components/DashboardLayout';
import { mockStakingPools, mockTokens } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Coins, Lock, TrendingUp, Unlock, Zap } from 'lucide-react';
import { toast } from 'sonner';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const yieldData = [
  { protocol: 'Lido', apy: 4.2, color: '#00F5FF' },
  { protocol: 'Polygon', apy: 8.7, color: '#8247E5' },
  { protocol: 'Aave', apy: 3.8, color: '#B6509E' },
  { protocol: 'Marinade', apy: 6.5, color: '#9945FF' },
  { protocol: 'Curve', apy: 5.1, color: '#FF6B00' },
  { protocol: 'Compound', apy: 2.9, color: '#39FF14' },
];

function PoolCard({ pool }: { pool: typeof mockStakingPools[0] }) {
  const apyColor = pool.apy > 7 ? '#39FF14' : pool.apy > 4 ? '#00F5FF' : '#8B5CF6';
  const tvlB = (pool.tvl / 1e9).toFixed(1);

  return (
    <div
      className="rounded-xl p-5 hover:border-[rgba(0,245,255,0.2)] transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm font-bold text-white">{pool.name}</div>
          <div className="text-xs text-white/40 mt-0.5">{pool.protocol} · {pool.chain}</div>
        </div>
        <div
          className="text-xl font-bold font-mono"
          style={{ color: apyColor, textShadow: `0 0 10px ${apyColor}60` }}
        >
          {pool.apy}%
          <span className="text-[10px] text-white/30 ml-1 font-sans">APY</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg bg-white/[0.03]">
          <div className="text-[10px] text-white/30 mb-1">TVL</div>
          <div className="text-xs font-mono text-white/70">${tvlB}B</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/[0.03]">
          <div className="text-[10px] text-white/30 mb-1">Staked</div>
          <div className="text-xs font-mono text-[#00F5FF]">{pool.staked} {pool.token}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/[0.03]">
          <div className="text-[10px] text-white/30 mb-1">Rewards</div>
          <div className="text-xs font-mono text-[#39FF14]">+{pool.rewards} {pool.token}</div>
        </div>
      </div>

      {/* APY bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-white/30 mb-1">
          <span>APY Progress</span>
          <span style={{ color: apyColor }}>{pool.apy}% / 15% max</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${(pool.apy / 15) * 100}%`,
              background: `linear-gradient(90deg, ${apyColor}80, ${apyColor})`,
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => toast.info('Stake tokens', { description: 'Feature coming soon' })}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
          style={{
            background: `${apyColor}15`,
            border: `1px solid ${apyColor}30`,
            color: apyColor,
          }}
        >
          <Lock className="w-3 h-3" />
          Stake
        </button>
        <button
          onClick={() => toast.info('Claim rewards', { description: `+${pool.rewards} ${pool.token} available` })}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all"
        >
          <Unlock className="w-3 h-3" />
          Claim
        </button>
      </div>
    </div>
  );
}

export default function DeFi() {
  const totalStakedValue = 12450;
  const totalRewards = 284.5;

  return (
    <DashboardLayout title="DeFi & Staking" subtitle="Yield farming, staking pools, and lending positions">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Staked Value', value: `$${totalStakedValue.toLocaleString()}`, icon: Lock, color: '#00F5FF' },
          { label: 'Pending Rewards', value: `$${totalRewards}`, icon: Coins, color: '#39FF14' },
          { label: 'Avg APY', value: '5.85%', icon: TrendingUp, color: '#8B5CF6' },
          { label: 'Active Positions', value: '4', icon: Zap, color: '#FF6B00' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${stat.color}20`,
            }}
          >
            <div className="p-2 rounded-lg" style={{ background: `${stat.color}15` }}>
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <div>
              <div className="text-sm font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] text-white/40">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* APY Comparison Chart */}
      <div
        className="rounded-xl p-5 mb-6"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(0,245,255,0.1)',
        }}
      >
        <h2 className="text-sm font-bold text-white mb-4">Protocol APY Comparison</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={yieldData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="protocol"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'Space Grotesk' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={35}
            />
            <Tooltip
              formatter={(v: number) => [`${v}% APY`, '']}
              contentStyle={{
                background: '#0A0F1E',
                border: '1px solid rgba(0,245,255,0.2)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="apy" radius={[4, 4, 0, 0]}>
              {yieldData.map((entry, i) => (
                <Cell key={i} fill={entry.color} opacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Staking Pools */}
      <h2 className="text-sm font-bold text-white mb-4">Active Staking Positions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockStakingPools.map((pool, i) => (
          <div key={pool.id} className="fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <PoolCard pool={pool} />
          </div>
        ))}
      </div>

      {/* Available Opportunities */}
      <div className="mt-6">
        <h2 className="text-sm font-bold text-white mb-4">Explore Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: 'Curve 3Pool', protocol: 'Curve Finance', apy: 5.1, tvl: '$2.1B', risk: 'Low', chain: 'Ethereum' },
            { name: 'Compound USDC', protocol: 'Compound', apy: 2.9, tvl: '$890M', risk: 'Low', chain: 'Ethereum' },
            { name: 'Raydium SOL-USDC', protocol: 'Raydium', apy: 12.4, tvl: '$145M', risk: 'Medium', chain: 'Solana' },
          ].map((opp) => (
            <div
              key={opp.name}
              className="flex items-center justify-between p-4 rounded-xl hover:border-[rgba(0,245,255,0.15)] transition-all cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              onClick={() => toast.info(opp.name, { description: `${opp.apy}% APY · ${opp.tvl} TVL · ${opp.risk} Risk` })}
            >
              <div>
                <div className="text-xs font-bold text-white">{opp.name}</div>
                <div className="text-[10px] text-white/40">{opp.protocol} · {opp.chain}</div>
                <div className="text-[10px] mt-1">
                  <span className={cn(
                    'px-1.5 py-0.5 rounded text-[9px] font-bold',
                    opp.risk === 'Low' ? 'text-[#39FF14] bg-[rgba(57,255,20,0.1)]' : 'text-[#FF6B00] bg-[rgba(255,107,0,0.1)]'
                  )}>
                    {opp.risk} Risk
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-mono text-[#39FF14]">{opp.apy}%</div>
                <div className="text-[10px] text-white/30">APY</div>
                <div className="text-[10px] text-white/40">{opp.tvl} TVL</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
