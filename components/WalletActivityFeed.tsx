"use client";

import { useEffect, useState } from "react";

export function WalletActivityFeed({ validator }: { validator: any }) {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const url =
        validator.chain === "ETH"
          ? `/api/wallet/eth?address=${validator.pubkey}`
          : validator.chain === "TON"
          ? `/api/wallet/ton?address=${validator.pubkey}`
          : `/api/wallet/tron?address=${validator.pubkey}`;

      const res = await fetch(url);
      const data = await res.json();
      setTxs(data.txs || []);
    }

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [validator]);

  return (
    <div className="panel fade-in">
      <h3 className="neon">Wallet Activity</h3>

      {txs.length === 0 && <p>No recent activity.</p>}

      {txs.map((tx: any, i) => (
        <div
          key={i}
          style={{
            padding: "10px 0",
            borderBottom: "1px solid #1f1f28",
            fontSize: 13,
          }}
        >
          <div style={{ color: "#2affff" }}>
            {tx.hash?.slice(0, 12)}...{tx.hash?.slice(-6)}
          </div>

          <div style={{ color: "#aaa" }}>
            {tx.value ? `${tx.value} wei` : "—"}
          </div>

          <div style={{ color: "#666" }}>
            {tx.timeStamp || tx.timestamp || tx.block_timestamp}
          </div>
        </div>
      ))}
    </div>
  );
}