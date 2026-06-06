"use client";

import { useState } from "react";
import WalletDrawer from "./WalletDrawer";

export default function WalletButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 18px",
          background: "linear-gradient(90deg, #2563eb, #1e40af)",
          borderRadius: 8,
          color: "white",
          fontWeight: 600,
          letterSpacing: 0.5,
          boxShadow: "0 0 12px rgba(37, 99, 235, 0.4)",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 16px rgba(37, 99, 235, 0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 12px rgba(37, 99, 235, 0.4)";
        }}
      >
        Connect Wallet
      </button>

      <WalletDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
