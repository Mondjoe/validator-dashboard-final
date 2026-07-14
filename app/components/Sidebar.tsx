"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "text-white font-semibold"
      : "text-gray-400 hover:text-white";

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-gray-800 bg-black px-6 py-8 space-y-8">
      <div className="text-2xl font-bold">Operator</div>

      <nav className="flex flex-col gap-4 text-sm">
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
        <Link href="/validator" className={linkClass("/validator")}>Validator</Link>
        <Link href="/wallet" className={linkClass("/wallet")}>Wallet</Link>
        <Link href="/multichain" className={linkClass("/multichain")}>Multichain</Link>
        <Link href="/liquidity" className={linkClass("/liquidity")}>Liquidity</Link>
        <Link href="/identity" className={linkClass("/identity")}>Identity</Link>
        <Link href="/dao" className={linkClass("/dao")}>DAO</Link>
      </nav>
    </aside>
  );
}