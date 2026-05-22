/*
 * DESIGN: Cyberpunk Noir — Multi-Chain
 * - Chain overview cards with network stats
 * - Cross-chain portfolio breakdown
 */

import DashboardLayout from '@/components/DashboardLayout';
import { chainStats } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Activity, ArrowUpRight, Globe, Layers, Zap } from 'lucide-react';
import { toast } from 'sonner';

const chains = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#627EEA',
    logo: '⟠',
    price: 3842.50,
    change: 3.2,
    blockTime: '12s',
    tps: 15,
    gasPrice: '32 Gwei',
    tvl: '$48.2B',
    nfts: 8,
    tokens: 4,
    value: 45820,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    color: '#9945FF',
    logo: '◎',
    price: 182.30,
    change: 5.8,
    blockTime: '0.4s',
    tps: 65000,
    gasPrice: '0.00025 SOL',
    tvl: '$4.5B',
    nfts: 2,
    tokens: 1,
    value: 12450,
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    color: '#8247E5',
    logo: '⬟',
    price: 0.892,
    change: 2.1,
    blockTime: '2s',
    tps: 7000,
    gasPrice: '80 Gwei',
    tvl: '$1.2B',
    nfts: 2,
    tokens: 1,
    value: 6820,
  },
  {
    name: 'BNB Chain',
    symbol: 'BNB',
    color: '#F3BA2F',
    logo: '⬡',
    price: 612.40,
    change: -1.2,
    blockTime: '3s',
    tps: 300,
    gasPrice: '3 Gwei',
    tvl: '$5.8B',
    nfts: 1,
    tokens: 1,
    value: 3331,
  },
];

export default function MultiChain() {
  return (
    <DashboardLayout title="Multi-Chain" subtitle="Cross-chain portfolio overview and network statistics">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Networks', value: '4', icon: Globe, color: '#00F5FF' },
          { label: 'Total Assets', value: '68,421', prefix: '$', icon: Layers, color: '#8B5CF6' },
          { label: 'Total NFTs', value: '12', icon: Activity, color: '#39FF14' },
          { label: 'Total Tokens', value: '7', icon: Zap, color: '#FF6B00' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}20` }}>
            <div className="p-2 rounded-lg" style={{ background: `${s.color}15` }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-sm font-bold font-mono" style={{ color: s.color }}>
                {s.prefix}{s.value}
              </div>
              <div className="text-[10px] text-white/40">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chain cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {chains.map((chain, i) => (
          <div
            key={chain.name}
            className="rounded-xl p-5 fade-up hover:border-opacity-40 transition-all cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${chain.color}25`,
              animationDelay: `${i * 80}ms`,
            }}
            onClick={() => toast.info(chain.name, { description: `${chain.nfts} NFTs · ${chain.tokens} Tokens · $${chain.value.toLocaleString()} value` })}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${chain.color}20`, border: `1px solid ${chain.color}40` }}
                >
                  {chain.logo}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{chain.name}</div>
                  <div className="text-[10px] text-white/40">{chain.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono text-white">${chain.price.toLocaleString()}</div>
                <div className={cn('text-[10px] font-mono flex items-center justify-end gap-0.5', chain.change >= 0 ? 'text-[#39FF14]' : 'text-[#FF006E]')}>
                  <ArrowUpRight className="w-3 h-3" />
                  {chain.change}%
                </div>
              </div>
            </div>

            {/* Portfolio value */}
            <div className="mb-4 p-3 rounded-lg" style={{ background: `${chain.color}08` }}>
              <div className="text-[10px] text-white/30 mb-1">Portfolio Value</div>
              <div className="text-lg font-bold font-mono" style={{ color: chain.color }}>
                ${chain.value.toLocaleString()}
              </div>
              <div className="text-[10px] text-white/40 mt-0.5">
                {chain.nfts} NFTs · {chain.tokens} Tokens
              </div>
            </div>

            {/* Network stats */}
            <div className="space-y-2">
              {[
                { label: 'Block Time', value: chain.blockTime },
                { label: 'TPS', value: chain.tps.toLocaleString() },
                { label: 'Gas Price', value: chain.gasPrice },
                { label: 'TVL', value: chain.tvl },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between">
                  <span className="text-[10px] text-white/30">{stat.label}</span>
                  <span className="text-[10px] font-mono text-white/60">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-chain allocation bar */}
      <div
        className="rounded-xl p-5"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}
      >
        <h2 className="text-sm font-bold text-white mb-4">Cross-Chain Allocation</h2>
        <div className="flex rounded-lg overflow-hidden h-8 mb-4">
          {chainStats.map((c) => (
            <div
              key={c.chain}
              className="flex items-center justify-center text-[10px] font-bold text-white/80 transition-all hover:opacity-90"
              style={{ width: `${c.percentage}%`, background: c.color, opacity: 0.8 }}
              title={`${c.chain}: ${c.percentage}%`}
            >
              {c.percentage > 10 ? `${c.percentage}%` : ''}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {chainStats.map((c) => (
            <div key={c.chain} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-xs text-white/60">{c.chain}</span>
              <span className="text-xs font-mono text-white/40">{c.percentage}%</span>
              <span className="text-xs font-mono text-white/60">${c.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
