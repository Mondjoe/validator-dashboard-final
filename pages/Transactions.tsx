/*
 * DESIGN: Cyberpunk Noir — Transactions
 * - Full transaction history table
 * - Type/status filters with neon badges
 * - Hash links with copy functionality
 */

import DashboardLayout from '@/components/DashboardLayout';
import { mockTransactions } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, Copy, ExternalLink, Filter, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const txTypeConfig: Record<string, { label: string; color: string; bg: string }> = {
  buy: { label: 'BUY', color: '#39FF14', bg: 'rgba(57,255,20,0.12)' },
  sell: { label: 'SELL', color: '#FF006E', bg: 'rgba(255,0,110,0.12)' },
  transfer: { label: 'TRANSFER', color: '#00F5FF', bg: 'rgba(0,245,255,0.12)' },
  mint: { label: 'MINT', color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
  stake: { label: 'STAKE', color: '#FF6B00', bg: 'rgba(255,107,0,0.12)' },
  unstake: { label: 'UNSTAKE', color: '#FF6B00', bg: 'rgba(255,107,0,0.12)' },
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(date);
}

export default function Transactions() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [chainFilter, setChainFilter] = useState('all');

  const types = ['all', 'buy', 'sell', 'transfer', 'mint', 'stake', 'unstake'];
  const statuses = ['all', 'confirmed', 'pending', 'failed'];
  const chains = ['all', 'Ethereum', 'Solana', 'Polygon', 'BNB Chain'];

  const filtered = mockTransactions.filter(tx => {
    if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
    if (chainFilter !== 'all' && tx.chain !== chainFilter) return false;
    return true;
  });

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash).then(() => {
      toast.success('Hash copied!');
    });
  };

  return (
    <DashboardLayout title="Transactions" subtitle="Complete on-chain activity history">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Transactions', value: '847', color: '#00F5FF' },
          { label: 'Volume (ETH)', value: '124.5 ETH', color: '#8B5CF6' },
          { label: 'Gas Spent', value: '0.842 ETH', color: '#FF6B00' },
          { label: 'Avg Gas Price', value: '38 Gwei', color: '#39FF14' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${stat.color}20`,
            }}
          >
            <div className="text-lg font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-white/40 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-white/30" />
          <span className="text-[10px] text-white/30 mr-1">Type:</span>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[10px] font-medium capitalize transition-all',
                typeFilter === t
                  ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/30'
                  : 'text-white/40 hover:text-white/60 border border-transparent'
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-white/30 mr-1">Status:</span>
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[10px] font-medium capitalize transition-all',
                statusFilter === s
                  ? 'bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30'
                  : 'text-white/40 hover:text-white/60 border border-transparent'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(0,245,255,0.1)',
        }}
      >
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.05] text-[10px] font-bold text-white/30 uppercase tracking-wider">
          <div className="col-span-1">Type</div>
          <div className="col-span-3">Item / Description</div>
          <div className="col-span-2">Hash</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-1">Chain</div>
          <div className="col-span-1">Gas</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Time</div>
        </div>

        {/* Rows */}
        {filtered.map((tx, i) => {
          const cfg = txTypeConfig[tx.type];
          return (
            <div
              key={tx.id}
              className={cn(
                'grid grid-cols-12 gap-4 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors',
                i !== filtered.length - 1 && 'border-b border-white/[0.04]'
              )}
            >
              {/* Type */}
              <div className="col-span-1">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded font-mono"
                  style={{ color: cfg.color, background: cfg.bg }}
                >
                  {cfg.label}
                </span>
              </div>

              {/* Item */}
              <div className="col-span-3 min-w-0">
                <div className="text-xs text-white/80 truncate">
                  {tx.nftName || `${tx.type} transaction`}
                </div>
                <div className="text-[10px] text-white/30 font-mono truncate">
                  {tx.from} → {tx.to}
                </div>
              </div>

              {/* Hash */}
              <div className="col-span-2 flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-white/40 truncate">{tx.hash}</span>
                <button
                  onClick={() => copyHash(tx.hash)}
                  className="text-white/20 hover:text-[#00F5FF] transition-colors flex-shrink-0"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={() => toast.info('Opening explorer...', { description: 'Feature coming soon' })}
                  className="text-white/20 hover:text-[#00F5FF] transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Amount */}
              <div className="col-span-2">
                <span className="text-xs font-mono text-white/80">
                  {tx.amount} {tx.currency}
                </span>
              </div>

              {/* Chain */}
              <div className="col-span-1">
                <span className="text-[10px] text-white/50">
                  {tx.chain === 'BNB Chain' ? 'BNB' : tx.chain.slice(0, 4)}
                </span>
              </div>

              {/* Gas */}
              <div className="col-span-1">
                <span className="text-[10px] font-mono text-white/40">
                  {tx.gasUsed.toFixed(4)}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-1">
                {tx.status === 'confirmed' && <CheckCircle className="w-3.5 h-3.5 text-[#39FF14]" />}
                {tx.status === 'pending' && <Clock className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />}
                {tx.status === 'failed' && <XCircle className="w-3.5 h-3.5 text-[#FF006E]" />}
              </div>

              {/* Time */}
              <div className="col-span-1">
                <span className="text-[10px] text-white/30">{formatTime(tx.timestamp)}</span>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30 text-sm">
            No transactions match your filters
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
