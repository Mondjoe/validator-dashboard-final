"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Rocket, 
  Cpu, 
  Wallet, 
  Terminal, 
  Settings, 
  ShieldCheck,
  Activity,
  Wrench
} from "lucide-react";

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "mission", label: "Mission Control", icon: Rocket, path: "/mission-control" },
  { id: "validators", label: "Validators", icon: ShieldCheck, path: "/validators" },
  { id: "wallet", label: "Wallet Assets", icon: Wallet, path: "/wallet" },
  { id: "terminal", label: "Terminal", icon: Terminal, path: "/terminal" },
  { id: "monitoring", label: "Monitoring", icon: Activity, path: "/dashboard" }, // Point to dashboard if no specific monitoring page
  { id: "tools", label: "Tools", icon: Wrench, path: "/tools" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export function OperatorSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#0A0A0B] border-r border-white/5 transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
          <div className="w-4 h-4 bg-cyan-400 rounded-sm animate-pulse" />
        </div>
        {!collapsed && (
          <span className="font-mono font-bold text-white tracking-tighter">
            CHARM<span className="text-cyan-400">CAPSULE</span>
          </span>
        )}
      </div>

      <nav className="p-4 space-y-2 mt-4">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.id} 
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all group ${
                isActive 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400"}`} />
              {!collapsed && (
                <span className="text-sm font-medium font-mono">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full p-3 rounded-lg bg-white/5 text-white/40 hover:text-white flex items-center justify-center transition-all"
        >
          {collapsed ? "→" : "← COLLAPSE"}
        </button>
      </div>
    </aside>
  );
}