"use client";

import DashboardLayout from "@/components/ui/DashboardLayout";
import { mockContractActivity } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { CheckCircle, Code2, Copy, ExternalLink, XCircle, Zap } from 'lucide-react';
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

const gasData = [
  { method: 'fulfillBasicOrder', gas: 145230, color: '#00F5FF' },
  { method: 'exactInputSingle', gas: 98450, color: '#8B5CF6' },
  { method: 'submit', gas: 87320, color: '#39FF14' },
  { method: 'deposit', gas: 156780, color: '#FF6B00' },
  { method: 'execute', gas: 212450, color: '#FF006E' },
];

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(date);
}

export default function Contracts() {
  return (
    <DashboardLayout title="Smart Contracts" subtitle="Contract interactions, gas usage, and method calls">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Interactions', value: '156', color: '#00F5FF' },
          { label: 'Unique Contracts', value: '23', color: '#8B5CF6' },
          { label: 'Total Gas Used', value: '0.842 ETH', color: '#FF6B00' },
          { label: 'Success Rate', value: '94.2%', color: '#39FF14' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}20` }}>
            <div className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[10px] text-white/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Gas chart */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div
          className="col-span-12 lg:col-span-7 rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}
        >
          <h2 className="text-sm font-bold text-white mb-4">Gas Usage by Method</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gasData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 80 }}>
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="method" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                formatter={(v: number) => [`${v.toLocaleString()} gas`, '']}
                contentStyle={{ background: '#0A0F1E', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="gas" radius={[0, 4, 4, 0]}>
                {gasData.map((entry, i) => <Cell key={i} fill={entry.color} opacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Most used contracts */}
        <div
          className="col-span-12 lg:col-span-5 rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.1)' }}
        >
          <h2 className="text-sm font-bold text-white mb-4">Most Used Contracts</h2>
          <div className="space-y-3">
            {[
              { name: 'OpenSea Seaport', calls: 48, color: '#00F5FF' },
              { name: 'Uniswap V3 Router', calls: 32, color: '#FF6B00' },
              { name: 'Lido stETH', calls: 18, color: '#8B5CF6' },
              { name: 'Aave V3 Pool', calls: 15, color: '#39FF14' },
              { name: 'Blur Exchange', calls: 12, color: '#FF006E' },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-white/70 truncate">{c.name}</span>
                    <span className="text-[10px] font-mono text-white/40 flex-shrink-0 ml-2">{c.calls} calls</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.05]">
                    <div className="h-full rounded-full" style={{ width: `${(c.calls / 48) * 100}%`, background: c.color, opacity: 0.7 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}
      >
        <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Recent Contract Interactions</h2>
          <Code2 className="w-4 h-4 text-white/20" />
        </div>
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.04] text-[10px] font-bold text-white/30 uppercase tracking-wider">
          <div className="col-span-4">Contract</div>
          <div className="col-span-2">Method</div>
          <div className="col-span-1">Chain</div>
          <div className="col-span-2">Gas Used</div>
          <div className="col-span-1">Value</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Time</div>
        </div>
        {mockContractActivity.map((activity, i) => (
          <div
            key={activity.id}
            className={cn(
              'grid grid-cols-12 gap-4 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors',
              i !== mockContractActivity.length - 1 && 'border-b border-white/[0.04]'
            )}
          >
            <div className="col-span-4 flex items-center gap-2">
              <div className="p-1.5 rounded bg-[rgba(0,245,255,0.08)]">
                <Code2 className="w-3 h-3 text-[#00F5FF]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-white/80 truncate font-mono">{activity.contract}</div>
              </div>
              <button
                onClick={() => toast.info('Opening contract on explorer', { description: 'Feature coming soon' })}
                className="text-white/20 hover:text-[#00F5FF] transition-colors flex-shrink-0"
              >
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] font-mono text-[#8B5CF6] bg-[rgba(139,92,246,0.1)] px-2 py-0.5 rounded truncate block">
                {activity.method}
              </span>
            </div>
            <div className="col-span-1 text-[10px] text-white/50">{activity.chain.slice(0, 4)}</div>
            <div className="col-span-2 text-xs font-mono text-white/60">{activity.gasUsed.toLocaleString()}</div>
            <div className="col-span-1 text-xs font-mono text-white/60">{activity.value > 0 ? `${activity.value} ETH` : '—'}</div>
            <div className="col-span-1">
              {activity.status === 'success'
                ? <CheckCircle className="w-3.5 h-3.5 text-[#39FF14]" />
                : <XCircle className="w-3.5 h-3.5 text-[#FF006E]" />}
            </div>
            <div className="col-span-1 text-[10px] text-white/30">{formatTime(activity.timestamp)}</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
