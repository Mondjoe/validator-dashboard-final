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
    if (!publicKey) return null;
    const lamports = await connection.getBalance(publicKey);
    return lamports / 1_000_000_000;
  };

  // Sui wallet
  const suiWallet = useWalletKit();
  const suiClient = new SuiClient({ url: "https://fullnode.mainnet.sui.io" });

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
      setHistory([]);
      return "";
    }

    // IDENTITY
    if (lower === "identity") {
      return "Operator Identity: CharmCapsule → Charm Operator → Mondjoe → Triopath → Heinhtat → Mr.j";
    }

    // STATUS
    if (lower === "status") {
      return "System Status: All modules online.";
    }

    // CHAINS
    if (lower === "chains") {
      return "Active Chains: Ethereum, TON, Solana, Sui";
    }

    // ETH
    if (lower === "eth") {
      return `
Ethereum Mainnet:
Chain ID: 1
RPC: https://eth.llamarpc.com
Status: Online
`;
    }

    // TON
    if (lower === "ton") {
      return `
TON Network:
RPC: https://toncenter.com/api/v2/jsonRPC
Status: Online
`;
    }

    // SOLANA
    if (lower === "solana") {