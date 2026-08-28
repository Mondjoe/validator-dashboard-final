"use client";

import { useState } from "react";
import { getEthValidatorMetrics } from "@/lib/ethValidator";
import { getTonValidatorMetrics } from "@/lib/tonValidator";
import { getTronValidatorMetrics } from "@/lib/tronValidator";

export function ValidatorMetricsPanel() {
  const [eth, setEth] = useState<any>(null);
  const [ton, setTon] = useState<any>(null);
  const [tron, setTron] = useState<any>(null);

  async function loadEth(pubkey: string) {
    const data = await getEthValidatorMetrics(pubkey);
    setEth(data);
  }

  async function loadTon(address: string) {
    const data = await getTonValidatorMetrics(address);
    setTon(data);
  }

  async function loadTron(address: string) {
    const data = await getTronValidatorMetrics(address);
    setTron(data);
  }

  return (
    <div className="p-6 border rounded-xl bg-black/40 mt-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Validator Metrics</h2>

      {/* ETH */}
      <div className="p-4 border rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold">Ethereum Validator</h3>
        {eth ? (
          <pre className="text-sm mt-2">{JSON.stringify(eth, null, 2)}</pre>
        ) : (
          <button
            onClick={() => loadEth(prompt("Enter ETH validator pubkey") || "")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load ETH Validator
          </button>
        )}
      </div>

      {/* TON */}
      <div className="p-4 border rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold">TON Validator</h3>
        {ton ? (
          <pre className="text-sm mt-2">{JSON.stringify(ton, null, 2)}</pre>
        ) : (
          <button
            onClick={() => loadTon(prompt("Enter TON validator address") || "")}
            className="px-4 py-2 bg-cyan-500 text-white rounded"
          >
            Load TON Validator
          </button>
        )}
      </div>

      {/* TRON */}
      <div className="p-4 border rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold">TRON Validator</h3>
        {tron ? (
          <pre className="text-sm mt-2">{JSON.stringify(tron, null, 2)}</pre>
        ) : (
          <button
            onClick={() => loadTron(prompt("Enter TRON validator address") || "")}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Load TRON Validator
          </button>
        )}
      </div>
    </div>
  );
}