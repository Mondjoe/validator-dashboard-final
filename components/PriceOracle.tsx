"use client";

import { useEffect, useState } from "react";

export function PriceOracle({ validator }: { validator: any }) {
  const [price, setPrice] = useState<any>(null);

  useEffect(() => {
    if (!validator) return;

    async function load() {
      const res = await fetch(`/api/price?chain=${validator.chain}`);
      const data = await res.json();
      setPrice(data);
    }

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [validator]);

  if (!price) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Price Oracle</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (price.error) {
    return (
      <div className="panel fade-in">
        <h3 className="neon">Price Oracle</h3>
        <p style={{ color: "#ff3366" }}>{price.error}</p>
      </div>
    );
  }

  return (
    <div className="panel fade-in">
      <h3 className="neon">Price Oracle</h3>

      <div style={{ marginTop: 10, fontSize: 16 }}>
        <span style={{ color: "#2affff" }}>
          {validator.chain} Price:
        </span>{" "}
        <span style={{ color: "#ffaa00" }}>
          ${price.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}