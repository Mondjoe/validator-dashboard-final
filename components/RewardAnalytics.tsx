"use client";

import { useEffect, useState } from "react";

export function RewardAnalytics({ validator }: { validator: any }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(
        `/api/rewards?chain=${validator.chain}&pubkey=${validator.pubkey}`
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
        <h3 className="neon">Reward Analytics</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Reward Analytics</h3>
        <p style={{ color: "#ff3366" }}>{data.error}</p>
      </div>
    );
  }

  return (
    <div className="panel fade-in">
      <h3 className="neon">Reward Analytics</h3>

      <div style={{ marginTop: 10, fontSize: 14 }}>
        <div>APR: <span style={{ color: "#2affff" }}>{(data.apr * 100).toFixed(2)}%</span></div>
        <div>APY: <span style={{ color: "#2affff" }}>{(data.apy * 100).toFixed(2)}%</span></div>
        <div>Daily Rewards: <span style={{ color: "#ffaa00" }}>{data.daily.toFixed(6)}</span></div>
        <div>Monthly Projection: <span style={{ color: "#ffaa00" }}>{data.monthly.toFixed(4)}</span></div>
        <div>Yearly Projection: <span style={{ color: "#ffaa00" }}>{data.yearly.toFixed(4)}</span></div>
      </div>
    </div>
  );
}