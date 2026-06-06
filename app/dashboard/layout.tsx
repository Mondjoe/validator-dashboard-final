"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const item = (href: string, label: string, icon: string) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`
          flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
          ${active 
            ? "bg-[#1f1f1f] text-blue-400 shadow-[0_0_12px_rgba(0,122,255,0.4)]" 
            : "hover:bg-[#1a1a1a] hover:shadow-[0_0_8px_rgba(0,122,255,0.25)]"
          }
        `}
      >
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <ThemeProvider>
      <TooltipProvider>
        <div className="flex min-h-screen bg-black text-white">

          {/* SIDEBAR */}
          <aside className="w-64 border-r border-[#222] p-6 space-y-8 bg-[#0b0b0b]">

            {/* BRAND */}
            <div className="mb-2">
              <h1 className="text-xl font-bold tracking-wide">Charm Capsule</h1>
              <p className="text-xs text-gray-500 mt-1">
                Proof‑Driven Governance
              </p>
            </div>

            {/* MAIN NAV */}
            <div>
              <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Main</p>
              <nav className="space-y-2">
                {item("/dashboard", "Dashboard", "📊")}
                {item("/snapshots", "Snapshots", "📘")}
                {item("/governance", "Governance", "🏛")}
                {item("/identity", "Capsule Identity", "🪪")}
                {item("/wallet", "Wallet Panel", "👛")}
              </nav>
            </div>

            {/* TOOLS */}
            <div>
              <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Tools</p>
              <nav className="space-y-2">
                {item("/tools", "Tools", "🧰")}
                {item("/logs", "Logs", "📄")}
                {item("/terminal", "Terminal", "💻")}
              </nav>
            </div>

            {/* SYSTEM */}
            <div>
              <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">System</p>
              <nav className="space-y-2">
                {item("/settings", "Settings", "⚙️")}
              </nav>
            </div>

          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-8">
            {children}
          </main>

        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
