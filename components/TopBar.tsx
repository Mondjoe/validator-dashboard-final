/*
 * DESIGN: Cyberpunk Noir TopBar
 * - Glassmorphism header with neon accents
 * - Live gas price indicator
 * - Network status badges
 */

import { Bell, Search, TrendingUp, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface TopBarProps {
  title?: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const [gasPrice, setGasPrice] = useState(32);
  const [ethPrice, setEthPrice] = useState(3842.50);

  // Simulate live gas price fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setGasPrice(prev => Math.max(8, Math.min(120, prev + (Math.random() - 0.5) * 4)));
      setEthPrice(prev => prev + (Math.random() - 0.5) * 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const gasColor = gasPrice < 20 ? '#39FF14' : gasPrice < 50 ? '#00F5FF' : gasPrice < 80 ? '#FF6B00' : '#FF006E';

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 border-b border-[rgba(0,245,255,0.08)]"
      style={{
        background: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Left: Title */}
      <div>
        {title && (
          <h1 className="text-lg font-bold text-white leading-tight">{title}</h1>
        )}
        {subtitle && (
          <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
          <input
            type="text"
            placeholder="Search NFTs, wallets, contracts..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white/60 placeholder:text-white/25 focus:outline-none focus:border-[rgba(0,245,255,0.3)] focus:bg-[rgba(0,245,255,0.03)] transition-all"
          />
        </div>
      </div>

      {/* Right: Live data + notifications */}
      <div className="flex items-center gap-4">
        {/* ETH Price */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(0,245,255,0.05)] border border-[rgba(0,245,255,0.1)]">
          <span className="text-[10px] text-white/40 font-mono">ETH</span>
          <span className="text-xs font-bold text-[#00F5FF] font-mono">
            ${ethPrice.toFixed(0)}
          </span>
          <TrendingUp className="w-3 h-3 text-[#39FF14]" />
        </div>

        {/* Gas Price */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
          <Zap className="w-3 h-3" style={{ color: gasColor }} />
          <span className="text-xs font-mono font-bold" style={{ color: gasColor }}>
            {Math.round(gasPrice)} Gwei
          </span>
        </div>

        {/* Network status */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
          <span className="text-[10px] text-white/40 hidden sm:block">Mainnet</span>
        </div>

        {/* Notifications */}
        <button
          onClick={() => toast.info('No new notifications', { description: 'You\'re all caught up!' })}
          className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/70"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#FF006E]" />
        </button>
      </div>
    </header>
  );
}
