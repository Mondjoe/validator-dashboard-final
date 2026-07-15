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
      return ` Portfolio Alert: Value dropped below $${alertMin}`;
    }

    if (alertMax !== null && totalUsd > alertMax) {
      return ` Portfolio Alert: Value exceeded $${alertMax}`;
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
portfolio alert status
portfolio alert off
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
      return "Operator Identity: CharmCapsule  Charm Operator  Mondjoe  Triopath  Heinhtat  Mr.j";
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
      return `
Solana Mainnet:
Cluster: mainnet-beta
RPC: https://api.mainnet-beta.solana.com
Status: Online
`;
    }

    // SUI
    if (lower === "sui") {
      return `
Sui Network:
RPC: https://fullnode.mainnet.sui.io
Status: Online
`;
    }

    // WALLET CONNECT ETH
    if (lower === "wallet connect eth") {
      await ethConnect();
      return `ETH Wallet Connected: ${address ?? "(fetching...)"}`;
    }

    // WALLET CONNECT TON
    if (lower === "wallet connect ton") {
      await tonConnectUI.connectWallet();
      return `TON Wallet Connected: ${tonAddress ?? "(fetching...)"}`;
    }

    // WALLET CONNECT SOLANA
    if (lower === "wallet connect solana") {
      await solConnect();
      return `Solana Wallet Connected: ${publicKey?.toBase58() ?? "(fetching...)"}`;
    }

    // WALLET CONNECT SUI
    if (lower === "wallet connect sui") {
      await suiWallet.connect();
      return `Sui Wallet Connected: ${suiWallet.account?.address ?? "(fetching...)"}`;
    }

    // WALLET ADDRESS ETH
    if (lower === "wallet address eth") {
      return `ETH Address: ${address ?? "Not connected"}`;
    }

    // WALLET ADDRESS TON
    if (lower === "wallet address ton") {
      return `TON Address: ${tonAddress ?? "Not connected"}`;
    }

    // WALLET ADDRESS SOLANA
    if (lower === "wallet address solana") {
      return `Solana Address: ${publicKey?.toBase58() ?? "Not connected"}`;
    }

    // WALLET ADDRESS SUI
    if (lower === "wallet address sui") {
      return `Sui Address: ${suiWallet.account?.address ?? "Not connected"}`;
    }

    // WALLET BALANCE ETH
    if (lower === "wallet balance eth") {
      if (!isConnected) return "ETH wallet not connected.";
      return `ETH Balance: ${ethBalance?.formatted} ETH`;
    }

    // WALLET BALANCE TON
    if (lower === "wallet balance ton") {
      if (!isTonConnected) return "TON wallet not connected.";
      return `TON Balance: ${tonBalance ?? ""} TON`;
    }

    // WALLET BALANCE SOLANA
    if (lower === "wallet balance solana") {
      if (!solConnected) return "Solana wallet not connected.";
      const sol = await getSolBalance();
      return `Solana Balance: ${sol} SOL`;
    }

    // WALLET BALANCE SUI
    if (lower === "wallet balance sui") {
      if (!suiWallet.account) return "Sui wallet not connected.";
      const bal = await suiClient.getBalance({
        owner: suiWallet.account.address,
      });
      return `Sui Balance: ${bal.totalBalance} SUI`;
    }

    // MULTICHAIN WALLET STATUS
    if (lower === "wallet status") {
      const solAddress = publicKey?.toBase58() ?? "Not connected";
      const solBalance = solConnected ? await getSolBalance() : null;

      const suiAddress = suiWallet.account?.address ?? "Not connected";
      const suiBalance = suiWallet.account
        ? await suiClient.getBalance({ owner: suiWallet.account.address })
        : null;

      return `
=== Multichain Wallet Status ===

ETH:
  Connected: ${isConnected ? "Yes" : "No"}
  Address: ${address ?? ""}
  Balance: ${ethBalance?.formatted ?? ""} ETH

TON:
  Connected: ${isTonConnected ? "Yes" : "No"}
  Address: ${tonAddress ?? ""}
  Balance: ${tonBalance ?? ""} TON

Solana:
  Connected: ${solConnected ? "Yes" : "No"}
  Address: ${solAddress}
  Balance: ${solBalance ?? ""} SOL

Sui:
  Connected: ${suiWallet.account ? "Yes" : "No"}
  Address: ${suiAddress}
  Balance: ${suiBalance?.totalBalance ?? ""} SUI
`;
    }

    // PORTFOLIO VALUE
    if (lower === "portfolio") {
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

      return `
=== Multichain Portfolio Value (USD) ===

ETH: $${ethUsd.toFixed(2)}
TON: $${tonUsd.toFixed(2)}
Solana: $${solUsd.toFixed(2)}
Sui: $${suiUsd.toFixed(2)}

---------------------------------------
TOTAL PORTFOLIO VALUE: $${totalUsd.toFixed(2)}
`;
    }

    // PORTFOLIO BREAKDOWN
    if (lower === "portfolio breakdown") {
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

      const breakdown = [
        { chain: "ETH", usd: ethUsd },
        { chain: "TON", usd: tonUsd },
        { chain: "Solana", usd: solUsd },
        { chain: "Sui", usd: suiUsd },
      ].sort((a, b) => b.usd - a.usd);

      return `
=== Portfolio Breakdown (USD) ===

ETH:
  Value: $${ethUsd.toFixed(2)}
  Share: ${(ethUsd / totalUsd * 100).toFixed(2)}%

TON:
  Value: $${tonUsd.toFixed(2)}
  Share: ${(tonUsd / totalUsd * 100).toFixed(2)}%

Solana:
  Value: $${solUsd.toFixed(2)}
  Share: ${(solUsd / totalUsd * 100).toFixed(2)}%

Sui:
  Value: $${suiUsd.toFixed(2)}
  Share: ${(suiUsd / totalUsd * 100).toFixed(2)}%

---------------------------------------
TOTAL PORTFOLIO VALUE: $${totalUsd.toFixed(2)}

=== Ranked Breakdown ===
${breakdown
  .map(
    (b, i) =>
      `${i + 1}. ${b.chain}  $${b.usd.toFixed(2)} (${(
        (b.usd / totalUsd) *
        100
      ).toFixed(2)}%)`
  )
  .join("\n")}
`;
    }

    // PORTFOLIO ALERT MIN
    if (lower.startsWith("portfolio alert min")) {
      const parts = lower.split(" ");
      const value = Number(parts[3]);
      if (isNaN(value)) return "Usage: portfolio alert min <usd>";
      setAlertMin(value);
      return `Portfolio MIN alert set at $${value}`;
    }

    // PORTFOLIO ALERT MAX
    if (lower.startsWith("portfolio alert max")) {
      const parts = lower.split(" ");
      const value = Number(parts[3]);
      if (isNaN(value)) return "Usage: portfolio alert max <usd>";
      setAlertMax(value);
      return `Portfolio MAX alert set at $${value}`;
    }

    // PORTFOLIO ALERT STATUSMax(value);
      return `Portfolio MAX alert set at $${value}`;
    }

    // PORTFOLIO ALERT STATUS
    if (lower === "portfolio alert status") {
      return `
=== Portfolio Alert Status ===
Min Alert: ${alertMin ?? "None"}
Max Alert: ${alertMax ?? "None"}
`;
    }

    // PORTFOLIO ALERT OFF
    if (lower === "portfolio alert off") {
      setAlertMin(null);
      setAlertMax(null);
      return "Portfolio alerts disabled.";
    }

    // WALLET DISCONNECT
    if (lower === "wallet disconnect") {
      ethDisconnect();
      tonConnectUI.disconnect();
      solDisconnect();
      suiWallet.disconnect();
      return "All wallets disconnected.";
    }

    // LIQUIDITY ROOT
    if (lower === "liquidity") {
      return `
Liquidity Module:
Commands:
liquidity pools
liquidity tvl
liquidity apr
liquidity info <pool>
liquidity deposit <pool> <amount>
liquidity withdraw <pool> <amount>
liquidity stake <pool> <amount>
`;
    }

    // LIQUIDITY POOLS
    if (lower === "liquidity pools") {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/liquidity/status`);
      const data = await res.json();
      return data.pools.map((p: any) => `- ${p.name} (${p.chain})`).join("\n");
    }

    // LIQUIDITY TVL
    if (lower === "liquidity tvl") {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/liquidity/status`);
      const data = await res.json();
      return `TVL: ${data.tvl}`;
    }

    // LIQUIDITY APR
    if (lower === "liquidity apr") {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/liquidity/status`);
      const data = await res.json();
      return `APR: ${data.apr}`;
    }

    // LIQUIDITY INFO
    if (lower.startsWith("liquidity info ")) {
      const pool = lower.split(" ")[2];
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/liquidity/status`);
      const data = await res.json();
      const found = data.pools.find((p: any) => p.name.toLowerCase() === pool);
      if (!found) return `Pool not found: ${pool}`;
      return `
Pool: ${found.name}
Chain: ${found.chain}
Address: ${found.address}
Liquidity: ${found.liquidity}
`;
    }

    // LIQUIDITY ACTIONS
    if (
      lower.startsWith("liquidity deposit") ||
      lower.startsWith("liquidity withdraw") ||
      lower.startsWith("liquidity stake")
    ) {
      const parts = lower.split(" ");
      const action = parts[1];
      const pool = parts[2];
      const amount = parts[3];

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/liquidity/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pool, action, amount }),
      });

      return `Liquidity Action Executed: ${action} ${amount} on ${pool}`;
    }

    return `Unknown command: ${cmd}`;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const output = await runCommand(input);
    setHistory((prev) => [...prev, `> ${input}`, output]);

    // Check alerts after every command
    const alertMsg = await checkPortfolioAlerts();
    if (alertMsg) {
      setHistory((prev) =>