"use client";

import React from 'react';

const WalletPage = () => {
  const assets = [
    { name: "Ethereum", symbol: "ETH", balance: "1.24", value: "$3,968.00", change: "+2.4%" },
    { name: "Solana", symbol: "SOL", balance: "50.00", balance_usd: "$7,500.00", change: "-1.2%" },
    { name: "USD Coin", symbol: "USDC", balance: "250.00", value: "$250.00", change: "0.0%" },
  ];

  return (
    <div className="p-6 bg-[#0d0d0d] min-height-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Wallet Panel</h1>
          <p className="text-gray-400">Manage your digital assets and transaction history.</p>
        </div>
        <button className="bg-[#2affff] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#00f5ff] transition-all">
          Connect Wallet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#1a1a1a] p-6 rounded-2xl border border-[#2affff20] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <div className="text-8xl">💳</div>
          </div>
          <div className="text-gray-400 mb-2">Total Balance</div>
          <div className="text-4xl font-bold mb-4">$11,718.00</div>
          <div className="flex gap-4">
            <button className="bg-[#2affff10] text-[#2affff] px-4 py-2 rounded-lg border border-[#2affff30] hover:bg-[#2affff20]">Send</button>
            <button className="bg-[#2affff10] text-[#2affff] px-4 py-2 rounded-lg border border-[#2affff30] hover:bg-[#2affff20]">Receive</button>
            <button className="bg-[#2affff10] text-[#2affff] px-4 py-2 rounded-lg border border-[#2affff30] hover:bg-[#2affff20]">Swap</button>
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#2affff20]">
          <h3 className="text-lg font-bold mb-4">Security Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">2FA Status</span>
              <span className="text-green-400">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Hardware Wallet</span>
              <span className="text-yellow-400">Not Linked</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-4">
              <div className="bg-[#2affff] h-full w-[80%]"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Wallet security is 80% complete.</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Your Assets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <div key={asset.symbol} className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2affff05] hover:border-[#2affff30] transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-[#0d0d0d] rounded-full flex items-center justify-center text-xl">
                {asset.symbol === 'ETH' ? 'Ξ' : asset.symbol === 'SOL' ? 'S' : '$'}
              </div>
              <span className={`text-xs ${asset.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{asset.change}</span>
            </div>
            <div className="text-sm text-gray-400">{asset.name}</div>
            <div className="text-xl font-bold">{asset.balance} {asset.symbol}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WalletPage;
