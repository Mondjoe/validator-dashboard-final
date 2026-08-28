"use client";

import WalletButton from "./WalletButton";

export function BrandHeader() {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px 0",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        marginBottom: 30,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 1,
            color: "#E6E6E6",
          }}
        >
          Charm Operator Console
        </div>

        <div
          style={{
            marginTop: 4,
            fontSize: 14,
            opacity: 0.7,
            color: "#A0A0A0",
          }}
        >
          Heinhtat Professional Services LLC — Sovereign Architecture Division
        </div>
      </div>

      {/* Wallet Button (top-right) */}
      <div style={{ marginRight: 10 }}>
        <WalletButton />
      </div>
    </div>
  );
}
