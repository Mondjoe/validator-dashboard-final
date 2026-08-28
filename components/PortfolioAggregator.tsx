"use client";

import { useEffect, useState } from "react";

export function PortfolioAggregator({ validator }: { validator: any }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(
        `/api/portfolio?chain=${validator.chain}&address=${validator.pubkey}`
      );
      const d = await res.json();
      setData(d);
    }

    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, [validator]);

  if (!data) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Portfolio</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Portfolio</h3>
        <p style={{ color: "#ff3366" }}>{data.error}</p>
      </div>
    );
  }

  const rewards = data.rewards;

  return (
    <div className="panel fade-in">
      <h3 className="neon">Portfolio</h3>

      <div style={{ marginTop: 10, fontSize: 14 }}>
        <div>
          Wallet Balance:{" "}
          <span style={{ color: "#2affff" }}>
            {data.balance.toFixed(4)} {validator.chain}
          </span>
        </div>

        <div>
          Wallet USD Value:{" "}
          <span style={{ color: "#ffaa00" }}>
            ${data.balanceUSD.toLocaleString()}
          </span>
        </div>

        <div style={{ marginTop: 10 }}>
          Token Price:{" "}
          <span style={{ color: "#2affff" }}>
            ${data.price.toLocaleString()}
          </span>
        </div>

        <div style={{ marginTop: 20 }}>
          <strong style={{ color: "#2affff" }}>Staking Rewards</strong>
          <div>APR: {(rewards.apr * 100).toFixed(2)}%</div>
          <div>APY: {(rewards.apy * 100).toFixed(2)}%</div>
          <div>Daily: {rewards.daily.toFixed(6)}</div>
          <div>Monthly: {rewards.monthly.toFixed(4)}</div>
          <div>Yearly: {rewards.yearly.toFixed(4)}</div>
        </div>
      </div>
    </div>
  );
}