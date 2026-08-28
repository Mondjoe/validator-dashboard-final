"use client";

import { useEffect, useState } from "react";
import { useIdentity } from "@/hooks/useIdentity";
import { formatUnits } from "viem";
import { createPublicClient, http } from "viem";
import { mainnet } from "wagmi/chains";
import { Connection, PublicKey } from "@solana/web3.js";
import { TonClient, Address } from "@ton/ton";

export default function WalletInfoPanel() {
  const id = useIdentity();

  // -----------------------------
  // STATE
  // -----------------------------
  const [evmBalance, setEvmBalance] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState<string | null>(null);
  const [tonBalance, setTonBalance] = useState<string | null>(null);
  const [tronBalance, setTronBalance] = useState<string | null>(null);

  // -----------------------------
  // EVM BALANCE
  // -----------------------------
  useEffect(() => {
    async function loadEvm() {
      if (!id.evm.address) return;

      const client = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      const bal = await client.getBalance({ address: id.evm.address });
      setEvmBalance(formatUnits(bal, 18));
    }

    loadEvm();
  }, [id.evm.address]);

  // -----------------------------
  // SOLANA BALANCE
  // -----------------------------
  useEffect(() => {
    async function loadSol() {
      if (!id.solana.address) return;

      const conn = new Connection("https://api.mainnet-beta.solana.com");
      const bal = await conn.getBalance(new PublicKey(id.solana.address));
      setSolBalance((bal / 1e9).toFixed(4));
    }

    loadSol();
  }, [id.solana.address]);

  // -----------------------------
  // TON BALANCE
  // -----------------------------
  useEffect(() => {
    async function loadTon() {
      if (!id.ton.address) return;

      const client = new TonClient({
        endpoint: "https://toncenter.com/api/v2/jsonRPC",
      });

      const bal = await client.getBalance(Address.parse(id.ton.address));
      setTonBalance((Number(bal) / 1e9).toFixed(4));
    }

    loadTon();
  }, [id.ton.address]);

  // -----------------------------
  // TRON BALANCE
  // -----------------------------
  useEffect(() => {
    async function loadTron() {
      if (!id.tron.address) return;
      if (!(window as any).tronWeb) return;

      const tw = (window as any).tronWeb;
      const bal = await tw.trx.getBalance(id.tron.address);
      setTronBalance((bal / 1e6).toFixed(2));
    }

    loadTron();
  }, [id.tron.address]);

  // -----------------------------
  // UI BLOCK
  // -----------------------------
  return (
    <div
      style={{
        background: "#0d0d12",
        padding: 20,
        borderRadius: 12,
        border: "1px solid rgba(0, 122, 255, 0.2)",
        boxShadow: "0 0 20px rgba(0, 122, 255, 0.15)",
        marginTop: 20,
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#4da6ff",
          marginBottom: 15,
        }}
      >
        Wallet Info Panel
      </h2>

      {/* EVM */}
      <InfoRow
        chain="EVM"
        address={id.evm.address}
        balance={evmBalance ? `${evmBalance} ETH` : null}
        color="#4da6ff"
      />

      {/* Solana */}
      <InfoRow
        chain="Solana"
        address={id.solana.address}
        balance={solBalance ? `${solBalance} SOL` : null}
        color="#c084fc"
      />

      {/* TON */}
      <InfoRow
        chain="TON"
        address={id.ton.address}
        balance={tonBalance ? `${tonBalance} TON` : null}
        color="#2dd4bf"
      />

      {/* TRON */}
      <InfoRow
        chain="TRON"
        address={id.tron.address}
        balance={tronBalance ? `${tronBalance} TRX` : null}
        color="#facc15"
      />
    </div>
  );
}

// --------------------------------------------
// SMALL REUSABLE ROW COMPONENT
// --------------------------------------------
function InfoRow({ chain, address, balance, color }: any) {
  return (
    <div
      style={{
        marginBottom: 15,
        paddingBottom: 12,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600, color }}>{chain}</div>

      <div
        style={{
          fontSize: 13,
          opacity: 0.8,
          marginTop: 4,
          wordBreak: "break-all",
        }}
      >
        {address || "Not connected"}
      </div>

      {balance && (
        <div
          style={{
            marginTop: 4,
            fontSize: 14,
            color: "#e6e6e6",
          }}
        >
          Balance: {balance}
        </div>
      )}
    </div>
  );
}
