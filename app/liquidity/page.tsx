"use client";

import { useState } from "react";

async function getLiquidity() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/liquidity/status`, {
    cache: "no-store"
  });

  return res.json();
}

export default function Page() {
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const [action, setAction] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const [data, setData] = useState<any>(null);

  if (!data) {
    getLiquidity().then(setData);
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Liquidity Module</h1>
        <p>Loading liquidity data…</p>
      </div>
    );
  }

  const openAction = (pool: any, actionType: string) => {
    setSelectedPool(pool);
    setAction(actionType);
  };

  const closeAction = () => {
    setSelectedPool(null);
    setAction(null);
    setAmount("");
  };

  const submitAction = async () => {
    const payload = {
      pool: selectedPool.name,
      action,
      amount,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/liquidity/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    closeAction();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Liquidity Module</h1>

      <div className="border border-gray-700 p-4 rounded-lg mb-6">
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>TVL:</strong> {data.tvl}</p>
        <p><strong>APR:</strong> {data.apr}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Pools</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.pools.map((pool: any, i: number) => (
          <div key={i} className="border border-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{pool.name}</h3>
            <p><strong>Chain:</strong> {pool.chain}</p>
            <p><strong>Address:</strong> {pool.address}</p>
            <p><strong>Liquidity:</strong> {pool.liquidity}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openAction(pool, "deposit")}
                className="px-3 py-2 bg-green-700 rounded"
              >
                Deposit
              </button>

              <button
                onClick={() => openAction(pool, "withdraw")}
                className="px-3 py-2 bg-yellow-700 rounded"
              >
                Withdraw
              </button>

              <button
                onClick={() => openAction(pool, "stake")}
                className="px-3 py-2 bg-blue-700 rounded"
              >
                Stake
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPool && action && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg w-96 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">
              {action.toUpperCase()} — {selectedPool.name}
            </h2>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white mb-4"
            />

            <div className="flex gap-2">
              <button
                onClick={submitAction}
                className="px-4 py-2 bg-green-700 rounded"
              >
                Confirm
              </button>

              <button
                onClick={closeAction}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}