"use client";

import React, { useState, useEffect } from 'react';
import { getGasPrice } from '@/lib/blockchain'; // စောစောက ကျွန်တော်ပေးထားတဲ့ lib ဖိုင်
import { motion } from 'framer-motion';

const MissionControl = () => {
  const [gas, setGas] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGas = async () => {
      const data = await getGasPrice();
      setGas(data);
      setLoading(false);
    };
    fetchGas();
    const interval = setInterval(fetchGas, 15000); // 15 စက္ကန့်တိုင်း တစ်ခါ update လုပ်မယ်
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-[#0d0d0d] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-[#2affff] drop-shadow-[0_0_10px_rgba(42,255,255,0.3)]">Mission Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#2affff20] hover:border-[#2affff50] transition-all"
        >
          <div className="text-gray-400 text-sm mb-2">Network Gas (ETH)</div>
          {loading ? (
            <div className="animate-pulse h-8 bg-gray-800 rounded w-20"></div>
          ) : (
            <div className="text-2xl font-mono font-bold text-[#2affff]">{gas?.baseFee} Gwei</div>
          )}
          <div className="text-[10px] text-green-400 mt-2">● Live Updates</div>
        </motion.div>

        {/* တခြား Card တွေကိုလည်း ဒီလိုပဲ data ချိတ်လို့ရပါတယ် */}
      </div>

      <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-dashed border-[#2affff30] flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-6xl mb-4 animate-bounce">🛰️</div>
        <h2 className="text-xl font-bold mb-2">Satellite Uplink Active</h2>
        <p className="text-gray-400 text-center max-w-md">Scanning for validator nodes and cross-chain transactions. All systems are currently within nominal parameters.</p>
        <button className="mt-6 bg-[#2affff] text-black px-8 py-2 rounded-full font-bold hover:scale-105 transition-transform">
          Re-scan Network
        </button>
      </div>
    </div>
  );
};
