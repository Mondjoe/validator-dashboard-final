'use client';

import { cn } from '@/lib/utils';
import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Flame,
  Grid3X3,
  Image,
  LayoutDashboard,
  Settings,
  Wallet,
  Zap,
  Twitter,
  Send,
  Globe,
  Github
} from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  accent?: 'cyan' | 'purple' | 'green';
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', accent: 'cyan' },
  { icon: Image, label: 'NFT Gallery', path: '/dashboard/nfts', accent: 'purple' },
  { icon: Wallet, label: 'Portfolio', path: '/dashboard/portfolio', accent: 'cyan' },
  { icon: Activity, label: 'Transactions', path: '/dashboard/transactions', accent: 'green' },
  { icon: BarChart3, label: 'DeFi / Staking', path: '/dashboard/defi', accent: 'purple' },
  { icon: Cpu, label: 'Contracts', path: '/dashboard/contracts', accent: 'cyan' },
  { icon: Flame, label: 'Gas Tracker', path: '/dashboard/gas', accent: 'green' },
  { icon: Grid3X3, label: 'Multi-Chain', path: '/dashboard/chains', accent: 'purple' }
];

const accentColors = {
  cyan: {
    active: 'text-[#00F5FF] bg-[#00F5FF]/10 border-l-2 border-[#00F5FF]',
    hover: 'hover:text-[#00F5FF] hover:bg-[#00F5FF]/5',
    icon: 'text-[#00F5FF]',
    dot: 'bg-[#00F5FF]'
  },
  purple: {
    active: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-l-2 border-[#8B5CF6]',
    hover: 'hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/5',
    icon: 'text-[#8B5CF6]',
    dot: 'bg-[#8B5CF6]'
  },
  green: {
    active: 'text-[#39FF14] bg-[#39FF14]/10 border-l-2 border-[#39FF14]',
    hover: 'hover:text-[#39FF14] hover:bg-[#39FF14]/5',
    icon: 'text-[#39FF14]',
    dot: 'bg-[#39FF14]'
  }
};

export default function Sidebar() {
  const [location, navigate] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const walletAddressFull = '0x0000000000000000000000000000000000000000'; // replace with real

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'bg-[#070B14] border-r border-[rgba(0,245,255,0.1)]',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
      style={{ boxShadow: '4px 0 24px rgba(0,0,0,0.4)' }}
    >
      {/* Brand */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-5 border-b border-[rgba(0,245,255,0.08)]',
          collapsed && 'justify-center px-2'
        )}
      >
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
          </div>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] opacity-30 blur-md" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-bold text-sm text-white leading-tight tracking-wide">
              Charm Capsule
            </div>
            <div className="text-[10px] text-[#00F5FF]/60 font-medium tracking-widest uppercase">
              Validator Dashboard
            </div>
          </div>
        )}
      </div>

      {/* Wallet */}
      {!collapsed && (
        <div className="mx-3 mt-4 p-3 rounded-lg bg-[rgba(0,245,255,0.04)] border border-[rgba(0,245,255,0.1)]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="text-[10px] text-[#39FF14] font-medium tracking-wider uppercase">
              Connected
            </span>
          </div>
          <div className="font-mono text-[11px] text-[#00F5FF]/80 truncate">
            {walletAddressFull.slice(0, 6) + '...' + walletAddressFull.slice(-4)}
          </div>
          <div className="text-[10px] text-white/40 mt-0.5">Ethereum Mainnet</div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const accent = item.accent || 'cyan';
          const colors = accentColors[accent];
          const isActive = location === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                'text-white/50',
                colors.hover,
                isActive && colors.active,
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0 transition-colors',
                  isActive ? colors.icon : 'text-white/40'
                )}
              />
              {!collapsed && (
                <span
                  className={cn(
                    'truncate transition-colors',
                    isActive ? '' : 'text-white/60'
                  )}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-1 border-t border-[rgba(255,255,255,0.05)] pt-3">
        <button
          onClick={() => navigate('/settings')}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
            'text-white/40 hover:text-white/70 hover:bg-white/5',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
            'text-white/30 hover:text-[#00F5FF]/70 hover:bg-[#00F5FF]/5',
            collapsed && 'justify-center px-2'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>

        <div className="mt-3 px-2 py-3 border-t border-white/5 space-y-3">
          <div className="flex justify-around items-center opacity-60 hover:opacity-100 transition-opacity">
            <a
              href="https://x.com/charmfi"
              target="_blank"
              className="hover:text-[#2affff] transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://t.me/charmfi"
              target="_blank"
              className="hover:text-[#2affff] transition-colors"
            >
              <Send size={18} />
            </a>
            <a
              href="https://github.com/Mondjoe"
              target="_blank"
              className="hover:text-[#2affff] transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://charmcapsule.io"
              target="_blank"
              className="hover:text-[#2affff] transition-colors"
            >
              <Globe size={18} />
            </a>
          </div>
          <div className="text-[10px] text-center text-white/20 font-mono uppercase tracking-widest">
            Charm Capsule v1.0.4
          </div>
        </div>
      </div>
    </aside>
  );
}
