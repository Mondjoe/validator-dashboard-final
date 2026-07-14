"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "text-white font-semibold"
      : "text-gray-400 hover:text-white";

  return (
    <nav className="flex items-center justify-between py-4 border-b border-gray-800">
      <div className="text-xl font-bold">Operator</div>

      <div className="flex gap-6 text-sm">
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
        <Link href="/validator" className={linkClass("/validator")}>Validator</Link>
        <Link href="/wallet" className={linkClass("/wallet")}>Wallet</Link>
        <Link href="/multichain" className={linkClass("/multichain")}>Multichain</Link>
        <Link href="/liquidity" className={linkClass("/liquidity")}>Liquidity</Link>
        <Link href="/identity" className={linkClass("/identity")}>Identity</Link>
        <Link href="/dao" className={linkClass("/dao")}>DAO</Link>
      </div>
    </nav>
  );
}