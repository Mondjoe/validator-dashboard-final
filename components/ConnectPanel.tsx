"use client";

import { useState } from "react";
import { CHAINS } from "@/lib/chains";
import { TonWalletSection } from "@/components/TonWalletSection";
import { TronWalletSection } from "@/components/TronWalletSection";
import { EvmWalletSection } from "@/components/EvmWalletSection";

export function ConnectPanel() {
  const [activeChain, setActiveChain] = useState(CHAINS.EVM_MAINNET);
type ChainType = "EVM" | "TON" | "TRON";

const [activeChain, setActiveChain] = useState<{ type: ChainType; name: string }>(
  CHAINS.EVM_MAINNET
);
  return (
    <div style={{ marginTop: 20 }}>
      <h2>Connect Wallet</h2>

      {/* Chain Selector */}
      <select
        value={activeChain.type}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "EVM") setActiveChain(CHAINS.EVM_MAINNET);
          if (v === "TON") setActiveChain(CHAINS.TON_MAINNET);
          if (v === "TRON") setActiveChain(CHAINS.TRON_MAINNET);
        }}
      >
        <option value="EVM">Ethereum (Rabby)</option>
        <option value="TON">TON (Tonkeeper)</option>
        <option value="TRON">TRON (TronLink)</option>
      </select>

      <div style={{ marginTop: 20 }}>
        {/* EVM */}
                {activeChain.type === "EVM" && (
        <EvmWalletSection />
        )}

        {/* TON */}
                {activeChain.type === "TON" && (
         <TonWalletSection />
        )}

        {/* TRON */}
                {activeChain.type === "TRON" && (
          <TronWalletSection />
        )}
      </div>
    </div>
  );
}