/*
 * DESIGN: Cyberpunk Noir — Gas Tracker
 * - Live gas price gauge
 * - 24h history chart
 * - Transaction cost estimator
 */

import DashboardLayout from '@/components/DashboardLayout';
import { mockGasHistory } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Flame, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function GasGauge({ value }: { value: number }) {
  const max = 150;
  const pct = Math.min(value / max, 1);
  const angle = -135 + pct * 270;
  const color = value < 20 ? '#39FF14' : value < 50 ? '#00F5FF' : value < 80 ? '#FF6B00' : '#FF006E';
  const label = value < 20 ? 'Low' : value < 50 ? 'Average' : value < 80 ? 'High' : 'Very High';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-28 overflow-hidden">
        {/* Background arc */}
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" strokeLinecap="round" />
          <path
            d="M 20 110 A 80 80 0 0 1 180 110"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${pct * 251} 251`}
            opacity="0.8"
          />
          {/* Needle */}
          <g transform={`translate(100, 110) rotate(${angle - 90})`}>
            <line x1="0" y1="0" x2="0" y2="-65" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="0" cy="0" r="4" fill={color} />
          </g>
          {/* Labels */}
          <text x="15" y="125" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="JetBrains Mono">0</text>
          <text x="170" y="125" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="JetBrains Mono">150</text>
        </svg>
      </div>
      <div className="text-4xl font-bold font-mono mt-2" style={{ color, textShadow: `0 0 20px ${color}60` }}>
        {Math.round(value)}
      </div>
      <div className="text-sm text-white/40 mt-1">Gwei</div>
      <div
        className="mt-2 px-3 py-1 rounded-full text-xs font-bold"
        style={{ color, background: `${color}20`, border: `1px solid ${color}40` }}
      >
        {label}
      </div>
    </div>
  );
}

export default function GasTracker() {
  const [gasPrice, setGasPrice] = useState(32);
  const [history, setHistory] = useState(mockGasHistory);

  useEffect(() => {
    const interval = setInterval(() => {
      setGasPrice(prev => Math.max(8, Math.min(120, prev + (Math.random() - 0.5) * 6)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const gasColor = gasPrice < 20 ? '#39FF14' : gasPrice < 50 ? '#00F5FF' : gasPrice < 80 ? '#FF6B00' : '#FF006E';

  const txCosts = [
    { action: 'ETH Transfer', gas: 21000, usd: ((gasPrice * 21000 * 1e-9) * 3842.5).toFixed(2) },
    { action: 'ERC-20 Transfer', gas: 65000, usd: ((gasPrice * 65000 * 1e-9) * 3842.5).toFixed(2) },
    { action: 'NFT Purchase (OpenSea)', gas: 145000, usd: ((gasPrice * 145000 * 1e-9) * 3842.5).toFixed(2) },
    { action: 'Uniswap Swap', gas: 150000, usd: ((gasPrice * 150000 * 1e-9) * 3842.5).toFixed(2) },
    { action: 'NFT Mint', gas: 200000, usd: ((gasPrice * 200000 * 1e-9) * 3842.5).toFixed(2) },
    { action: 'Contract Deploy', gas: 500000, usd: ((gasPrice * 500000 * 1e-9) * 3842.5).toFixed(2) },
  ];

  return (
    <DashboardLayout title="Gas Tracker" subtitle="Live Ethereum gas prices and transaction cost estimator">
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Gauge */}
        <div
          className="col-span-12 md:col-span-4 rounded-xl p-6 flex flex-col items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${gasColor}20` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-sm font-bold text-white">Live Gas Price</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
          </div>
          <GasGauge value={gasPrice} />
          <div className="mt-4 text-[10px] text-white/30 text-center">Updates every 2 seconds</div>
        </div>

        {/* Gas tiers */}
        <div
          className="col-span-12 md:col-span-4 rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}
        >
          <h2 className="text-sm font-bold text-white mb-4">Gas Tiers</h2>
          <div className="space-y-3">
            {[
              { tier: 'Slow', gwei: Math.round(gasPrice * 0.85), time: '~5 min', color: '#39FF14' },
              { tier: 'Standard', gwei: Math.round(gasPrice), time: '~1 min', color: '#00F5FF' },
              { tier: 'Fast', gwei: Math.round(gasPrice * 1.2), time: '~30 sec', color: '#FF6B00' },
              { tier: 'Instant', gwei: Math.round(gasPrice * 1.5), time: '<15 sec', color: '#FF006E' },
            ].map((tier) => (
              <div key={tier.tier} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
                  <span className="text-xs text-white/70">{tier.tier}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold" style={{ color: tier.color }}>{tier.gwei} Gwei</div>
                  <div className="text-[10px] text-white/30">{tier.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className="col-span-12 md:col-span-4 rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.1)' }}
        >
          <h2 className="text-sm font-bold text-white mb-4">24h Statistics</h2>
          <div className="space-y-3">
            {[
              { label: 'Average', value: '38 Gwei', icon: Zap, color: '#00F5FF' },
              { label: 'Minimum', value: '12 Gwei', icon: TrendingDown, color: '#39FF14' },
              { label: 'Maximum', value: '95 Gwei', icon: TrendingUp, color: '#FF006E' },
              { label: 'Base Fee', value: `${Math.round(gasPrice * 0.9)} Gwei`, icon: Flame, color: '#FF6B00' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  <span className="text-xs text-white/50">{s.label}</span>
                </div>
                <span className="text-xs font-mono" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 24h History Chart */}
      <div
        className="rounded-xl p-5 mb-6"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}
      >
        <h2 className="text-sm font-bold text-white mb-4">24h Gas Price History</h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={mockGasHistory}>
            <defs>
              <linearGradient id="gasGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} width={30} />
            <Tooltip
              formatter={(v: number) => [`${v} Gwei`, 'Gas Price']}
              contentStyle={{ background: '#0A0F1E', border: '1px solid rgba(255,107,0,0.3)', borderRadius: '8px', fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="value" stroke="#FF6B00" strokeWidth={2} fill="url(#gasGrad)" dot={false} activeDot={{ r: 4, fill: '#FF6B00', stroke: '#050810', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction Cost Estimator */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,107,0,0.1)' }}
      >
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-bold text-white">Transaction Cost Estimator</h2>
          <p className="text-xs text-white/40 mt-0.5">Based on current gas price: {Math.round(gasPrice)} Gwei</p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {txCosts.map((tx) => (
            <div key={tx.action} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <div>
                <div className="text-xs text-white/80">{tx.action}</div>
                <div className="text-[10px] text-white/30 font-mono">{tx.gas.toLocaleString()} gas units</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono text-[#FF6B00]">${tx.usd}</div>
                <div className="text-[10px] text-white/30">≈ {((gasPrice * tx.gas * 1e-9)).toFixed(5)} ETH</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
