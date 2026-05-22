"use client";

import DashboardLayout from "@/components/ui/DashboardLayout";
import { mockNFTs, type NFT } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Filter, Grid2X2, Grid3X3, Search, SlidersHorizontal } from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';

const rarityColors: Record<string, { color: string; bg: string; border: string }> = {
  Common: { color: '#888', bg: 'rgba(136,136,136,0.1)', border: 'rgba(136,136,136,0.3)' },
  Uncommon: { color: '#39FF14', bg: 'rgba(57,255,20,0.1)', border: 'rgba(57,255,20,0.3)' },
  Rare: { color: '#00F5FF', bg: 'rgba(0,245,255,0.1)', border: 'rgba(0,245,255,0.3)' },
  Epic: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)' },
  Legendary: { color: '#FF6B00', bg: 'rgba(255,107,0,0.1)', border: 'rgba(255,107,0,0.3)' },
};

const chainColors: Record<string, string> = {
  Ethereum: '#627EEA',
  Solana: '#9945FF',
  Polygon: '#8247E5',
  'BNB Chain': '#F3BA2F',
};

function NFTCard({ nft, large = false }: { nft: NFT; large?: boolean }) {
  const rc = rarityColors[nft.rarity];
  const isPositive = nft.change24h >= 0;

  return (
    <div
      className="nft-card rounded-xl overflow-hidden cursor-pointer group relative"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
      onClick={() => toast.info(nft.name, {
        description: `${nft.collection} · ${nft.rarity} · Token #${nft.tokenId}`,
      })}
    >
      {/* Image */}
      <div className={cn('relative overflow-hidden', large ? 'aspect-[4/3]' : 'aspect-square')}>
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {/* Rarity badge */}
        <div className="absolute top-2 left-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ color: rc.color, background: rc.bg, border: `1px solid ${rc.border}` }}
          >
            {nft.rarity}
          </span>
        </div>
        
        {/* Chain badge */}
        <div className="absolute top-2 right-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: `${chainColors[nft.chain]}30`, border: `1px solid ${chainColors[nft.chain]}60` }}
          >
            {nft.chain === 'BNB Chain' ? 'BNB' : nft.chain.slice(0, 3).toUpperCase()}
          </span>
        </div>

        {/* Hover action */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-1.5 rounded-lg bg-[#00F5FF]/20 border border-[#00F5FF]/40">
            <ArrowUpRight className="w-3 h-3 text-[#00F5FF]" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">{nft.name}</div>
            <div className="text-[10px] text-white/40 truncate">{nft.collection}</div>
          </div>
          <div className={cn(
            'text-[10px] font-mono flex-shrink-0',
            isPositive ? 'text-[#39FF14]' : 'text-[#FF006E]'
          )}>
            {isPositive ? '+' : ''}{nft.change24h}%
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-[9px] text-white/30 mb-0.5">Floor Price</div>
            <div className="text-sm font-bold text-[#00F5FF] font-mono">
              {nft.price} {nft.currency}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-white/30 mb-0.5">Last Sale</div>
            <div className="text-xs text-white/60 font-mono">
              {nft.lastSale} {nft.currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NFTGallery() {
  const [search, setSearch] = useState('');
  const [selectedChain, setSelectedChain] = useState<string>('All');
  const [selectedRarity, setSelectedRarity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'name'>('price');
  const [gridSize, setGridSize] = useState<'sm' | 'lg'>('sm');

  const chains = ['All', 'Ethereum', 'Solana', 'Polygon', 'BNB Chain'];
  const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

  const filtered = useMemo(() => {
    let result = [...mockNFTs];
    if (search) result = result.filter(n => n.name.toLowerCase().includes(search.toLowerCase()) || n.collection.toLowerCase().includes(search.toLowerCase()));
    if (selectedChain !== 'All') result = result.filter(n => n.chain === selectedChain);
    if (selectedRarity !== 'All') result = result.filter(n => n.rarity === selectedRarity);
    result.sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return b.change24h - a.change24h;
      return a.name.localeCompare(b.name);
    });
    return result;
  }, [search, selectedChain, selectedRarity, sortBy]);

  return (
    <DashboardLayout title="NFT Gallery" subtitle={`${mockNFTs.length} items in your collection`}>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
          <input
            type="text"
            placeholder="Search NFTs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[rgba(0,245,255,0.3)] transition-all"
          />
        </div>

        {/* Chain filter */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-white/30" />
          {chains.map(chain => (
            <button
              key={chain}
              onClick={() => setSelectedChain(chain)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all',
                selectedChain === chain
                  ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/30'
                  : 'text-white/40 hover:text-white/60 border border-transparent hover:border-white/10'
              )}
            >
              {chain === 'BNB Chain' ? 'BNB' : chain}
            </button>
          ))}
        </div>

        {/* Rarity filter */}
        <div className="flex items-center gap-1.5">
          {rarities.map(rarity => (
            <button
              key={rarity}
              onClick={() => setSelectedRarity(rarity)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all',
                selectedRarity === rarity
                  ? 'bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30'
                  : 'text-white/40 hover:text-white/60 border border-transparent hover:border-white/10'
              )}
            >
              {rarity}
            </button>
          ))}
        </div>

        {/* Sort + Grid toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <SlidersHorizontal className="w-3 h-3 text-white/30" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="text-[10px] text-white/60 bg-transparent focus:outline-none"
            >
              <option value="price">Price</option>
              <option value="change">24h Change</option>
              <option value="name">Name</option>
            </select>
          </div>
          <button
            onClick={() => setGridSize(gridSize === 'sm' ? 'lg' : 'sm')}
            className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/70 transition-colors"
          >
            {gridSize === 'sm' ? <Grid2X2 className="w-3.5 h-3.5" /> : <Grid3X3 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 mb-5 text-xs text-white/40">
        <span><span className="text-white/70 font-mono">{filtered.length}</span> items</span>
        <span>Floor: <span className="text-[#00F5FF] font-mono">0.45 ETH</span></span>
        <span>Total Value: <span className="text-[#00F5FF] font-mono">$42,580</span></span>
        <span>Best Performer: <span className="text-[#39FF14] font-mono">+18.7%</span></span>
      </div>

      {/* NFT Grid */}
      <div className={cn(
        'grid gap-4',
        gridSize === 'sm'
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      )}>
        {filtered.map((nft, i) => (
          <div key={nft.id} className="fade-up" style={{ animationDelay: `${i * 40}ms` }}>
            <NFTCard nft={nft} large={gridSize === 'lg'} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🔍</div>
          <div className="text-white/40 text-sm">No NFTs match your filters</div>
        </div>
      )}
    </DashboardLayout>
  );
}
