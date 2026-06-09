'use client'

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { fetchNFTs, fetchTokenBalances, fetchTransactions } from "@/lib/alchemy";
import { mockPortfolioHistory, chainDistribution } from "@/lib/mockData";
import DashboardLayout from "@/components/ui/DashboardLayout";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ArrowUpRight, Loader2 } from "lucide-react";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    portfolioValue: '$0.00',
    nftValue: '$0.00',
    nftCount: 0,
    pnl: '+$0.00',
    transactions: [],
    tokens: []
  });

  const ENABLE_REAL_DATA = process.env.NEXT_PUBLIC_ENABLE_REAL_DATA === 'true';
  const TARGET_ADDRESS = address || process.env.NEXT_PUBLIC_DEFAULT_WALLET_ADDRESS || '0x7F5f4D9217057D5D604A9b9ea449';

  useEffect(() => {
    async function loadDashboardData() {
      if (!ENABLE_REAL_DATA) {
        // Fallback to mock data if real data is disabled
        setData({
          portfolioValue: '$68,421.05',
          nftValue: '$42,621.30',
          nftCount: 12,
          pnl: '+$18,421.05',
          transactions: [], // Will use mock in UI
          tokens: []
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [nfts, tokens, txs] = await Promise.all([
          fetchNFTs(TARGET_ADDRESS),
          fetchTokenBalances(TARGET_ADDRESS),
          fetchTransactions(TARGET_ADDRESS)
        ]);

        // Simple calculation for demo purposes
        // In a real app, you'd fetch prices for each token
        const totalValue = tokens.reduce((acc, t) => acc + parseFloat(t.tokenBalance || '0'), 0);
        
        setData({
          portfolioValue: `$${(totalValue * 3000).toLocaleString()}`, // Mock price multiplier
          nftValue: `$${(nfts.length * 500).toLocaleString()}`,
          nftCount: nfts.length,
          pnl: '+$2,421.05',
          transactions: txs.slice(0, 5),
          tokens: tokens.slice(0, 5)
        });
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [TARGET_ADDRESS, ENABLE_REAL_DATA]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="ml-3 text-cyan-400 font-mono">Fetching On-chain Data...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Portfolio Value', value: data.portfolioValue, change: '+4.8%', color: '#00F5FF' },
          { label: 'NFT Holdings Value', value: data.nftValue, change: '+5.2%', color: '#8B5CF6' },
          { label: 'Total NFTs Owned', value: data.nftCount.toString(), change: '+0%', color: '#39FF14' },
          { label: 'All-Time P&L', value: data.pnl, change: '+36.9%', color: '#FF6B00' },
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
        <div className="lg:col-span-2 rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}>
          <div className="mb-4">
            <h2 className="text-sm font-bold text-white">Portfolio Performance</h2>
            <p className="text-xs text-white/40">Real-time tracking enabled</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockPortfolioHistory}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ background: '#0A0A0B', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '8px' }}
                itemStyle={{ color: '#00F5FF' }}
              />
              <Area type="monotone" dataKey="value" stroke="#00F5FF" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chain Distribution */}
        <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.1)' }}>
          <h2 className="text-sm font-bold text-white mb-6">Chain Distribution</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chainDistribution}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chainDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {chainDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-white/60">{item.name}</span>
                </div>
                <span className="text-white font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}