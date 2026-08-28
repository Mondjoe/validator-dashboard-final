"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Operator Control Center</h1>

      <p className="text-gray-400">
        Welcome to your unified validator, wallet, multichain, liquidity, identity and governance dashboard.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/dashboard"
          className="p-4 bg-gray-900 rounded-lg border border-gray-700 hover:bg-gray-800"
        >
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-gray-400">Operator overview and analytics</p>
        </Link>

        <Link
          href="/validator"
          className="p-4 bg-gray-900 rounded-lg border border-gray-700 hover:bg-gray-800"
        >
          <h2 className="text-xl font-semibold">Validator</h2>
          <p className="text-gray-400">Validator status and performance</p>
        </Link>
      </div>
    </div>
  );
}