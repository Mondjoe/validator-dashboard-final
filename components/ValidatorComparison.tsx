"use client";

import { useEffect, useState } from "react";

export function ValidatorComparison() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/compare");
      const d = await res.json();
      setData(d.validators || []);
    }

    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel fade-in">
      <h3 className="neon">Cross‑Validator Comparison</h3>

      <table style={{ width: "100%", fontSize: 13, marginTop: 10 }}>
        <thead>
          <tr style={{ color: "#2affff" }}>
            <th align="left">Validator</th>
            <th align="left">Uptime</th>
            <th align="left">APR</th>
            <th align="left">Daily</th>
            <th align="left">Monthly</th>
            <th align="left">Yearly</th>
          </tr>
        </thead>

        <tbody>
          {data.map((v, i) => (
            <tr key={i} style={{ color: "#ccc", borderBottom: "1px solid #1f1f28" }}>
              <td>{v.id}</td>
              <td style={{ color: v.uptime > 0.95 ? "#2affff" : "#ff3366" }}>
                {(v.uptime * 100).toFixed(2)}%
              </td>
              <td>{(v.rewards.apr * 100).toFixed(2)}%</td>
              <td>{v.rewards.daily.toFixed(6)}</td>
              <td>{v.rewards.monthly.toFixed(4)}</td>
              <td>{v.rewards.yearly.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}