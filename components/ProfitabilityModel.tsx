"use client";

import { useEffect, useState } from "react";

export function ProfitabilityModel({ validator }: { validator: any }) {
  const [data, setData] = useState<any>(null);

  // User-configurable inputs
  const [hardware, setHardware] = useState(1500); // USD
  const [electricity, setElectricity] = useState(0.12); // USD/kWh
  const [power, setPower] = useState(80); // watts
  const [validators, setValidators] = useState(1);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(
        `/api/profit?chain=${validator.chain}&pubkey=${validator.pubkey}` +
        `&hardware=${hardware}&electricity=${electricity}` +
        `&power=${power}&validators=${validators}`
      );
      const d = await res.json();
      setData(d);
    }

    load();
  }, [validator, hardware, electricity, power, validators]);

  if (!data) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Profitability Model</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Profitability Model</h3>
        <p style={{ color: "#ff3366" }}>{data.error}</p>
      </div>
    );
  }

  return (
    <div className="panel fade-in">
      <h3 className="neon">Profitability Model</h3>

      <div style={{ marginBottom: 15 }}>
        <label>Hardware Cost (USD)</label>
        <input value={hardware} onChange={e => setHardware(Number(e.target.value))} />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Electricity Cost (USD/kWh)</label>
        <input value={electricity} onChange={e => setElectricity(Number(e.target.value))} />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Power Usage (Watts)</label>
        <input value={power} onChange={e => setPower(Number(e.target.value))} />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Validator Count</label>
        <input value={validators} onChange={e => setValidators(Number(e.target.value))} />
      </div>

      <div style={{ fontSize: 14 }}>
        <div>Daily Revenue: <span style={{ color: "#2affff" }}>{data.revenue.daily.toFixed(4)}</span></div>
        <div>Monthly Revenue: <span style={{ color: "#2affff" }}>{data.revenue.monthly.toFixed(4)}</span></div>
        <div>Yearly Revenue: <span style={{ color: "#2affff" }}>{data.revenue.yearly.toFixed(4)}</span></div>

        <div style={{ marginTop: 10 }}>Monthly Profit: <span style={{ color: "#ffaa00" }}>{data.profit.monthly.toFixed(4)}</span></div>
        <div>Yearly Profit: <span style={{ color: "#ffaa00" }}>{data.profit.yearly.toFixed(4)}</span></div>

        {data.breakEvenMonths && (
          <div style={{ marginTop: 10 }}>
            Break-even: <span style={{ color: "#ff3366" }}>{data.breakEvenMonths.toFixed(1)} months</span>
          </div>
        )}

        {data.roi && (
          <div>
            ROI: <span style={{ color: "#2affff" }}>{(data.roi * 100).toFixed(2)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}