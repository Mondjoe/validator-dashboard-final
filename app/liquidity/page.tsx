"use client";

import { useState } from "react";

// ETH wallet (wagmi)
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

// TON wallet
import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";

// Solana wallet
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Page() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

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
  const { publicKey, connected: solConnected, connect: solConnect, disconnect: solDisconnect } = useWallet();

  const getSolBalance = async () => {
    if (!publicKey) return null;
    const lamports = await connection.getBalance(publicKey);
    return lamports / 1_000_000_000;
  };

  // TERMINAL COMMAND ENGINE
  const runCommand = async (cmd: string) => {
    const lower = cmd.toLowerCase();

    // HELP
    if (lower === "help") {
      return `
Available Commands:
identity, status, chains
eth, ton, solana
wallet connect eth
wallet connect ton
wallet connect solana
wallet address eth
wallet address ton
wallet address solana
wallet balance eth
wallet balance ton
wallet balance solana
wallet disconnect
liquidity
liquidity pools
liquidity tvl
liquidity apr
liquidity info <pool>
liquidity deposit <pool> <amount>
liquidity withdraw <pool> <amount>
liquidity stake <pool> <amount>
`;
    }

    // CLEAR
    if (lower === "clear") {