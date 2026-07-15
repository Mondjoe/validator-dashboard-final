"use client";

import { useState } from "react";

// ETH wallet (wagmi)
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

// TON wallet
import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";

// Solana wallet
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// Sui wallet
import { useWalletKit } from "@mysten/wallet-kit";
import { SuiClient } from "@mysten/sui.js/client";

export default function Page() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // Portfolio alerts
  const [alertMin, setAlertMin] = useState<number | null>(null);
  const [alertMax, setAlertMax] = useState<number | null>(null);

  // ETH wallet
  const { address, isConnected } = useAccount();
  const { disconnect: ethDisconnect } = useDisconnect();
  const { connect: ethConnect } = useConnect({ connector: injected() });
  const { data: ethBalance } = useBalance({
    address,
    chainId: 1,
    enabled: isConnected,
  });

  // TON wallet
  const [tonConnectUI] = useTonConnectUI();
  const tonAddress = tonConnectUI.account?.address ?? null;
  const tonBalance = tonConnectUI.account?.balance ?? null;
  const isTonConnected = tonConnectUI.account !== null;

  // Solana wallet
  const { connection } = useConnection();
  const {
    publicKey,
    connected: solConnected,
    connect: solConnect,
    disconnect: solDisconnect,
  } = useWallet();

  const getSolBalance = async () => {
    if (!publicKey) return 0;
    const lamports = await connection.getBalance(publicKey);
    return lamports / 1_000_000_000;
  };

  // Sui wallet
  const suiWallet = useWalletKit();
  const suiClient = new SuiClient({ url: "https://fullnode.mainnet.sui.io" });

  // Price fetcher
  async function getPrices() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,toncoin,solana,sui&vs_currencies=usd"
    );
    return res.json();
  }

  // Portfolio alert checker
  async function checkPortfolioAlerts() {
    const prices = await getPrices();

    const ethBal = isConnected ? Number(ethBalance?.formatted ?? 0) : 0;
    const ethUsd = ethBal * (prices.ethereum.usd ?? 0);

    const tonBal = isTonConnected ? Number(tonBalance ?? 0) : 0;
    const tonUsd = tonBal * (prices.toncoin.usd ?? 0);

    const solBal = solConnected ? await getSolBalance() : 0;
    const solUsd = solBal * (prices.solana.usd ?? 0);

    const suiBal = suiWallet.account
      ? Number(
          (await suiClient.getBalance({
            owner: suiWallet.account.address,
          })).totalBalance
        ) / 1_000_000_000
      : 0;
    const suiUsd = suiBal * (prices.sui.usd ?? 0);

    const totalUsd = ethUsd + tonUsd + solUsd + suiUsd;

    if (alertMin !== null && totalUsd < alertMin) {
      return `⚠️ Portfolio Alert: Value dropped below $${alertMin}`;
    }

    if (alertMax !== null && totalUsd > alertMax) {
      return `⚠️ Portfolio Alert: Value exceeded $${alertMax}`;
    }

    return null;
  }

  const runCommand = async (cmd: string) => {
    const lower = cmd.toLowerCase();

    // HELP
    if (lower === "help") {
      return `
Available Commands:
identity, status, chains
eth, ton, solana, sui
wallet connect eth
wallet connect ton
wallet connect solana
wallet connect sui
wallet address eth
wallet address ton
wallet address solana
wallet address sui
wallet balance eth
wallet balance ton
wallet balance solana
wallet balance sui
wallet status
wallet disconnect
portfolio
portfolio breakdown
portfolio alert min <usd>
portfolio alert max <usd>
portfolio