import { NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";
import { createPublicClient, http, formatEther } from "viem";
import {
  mainnet,
  bsc,
  polygon,
  arbitrum,
  optimism,
  avalanche,
  base,
  scroll,
  zkSync
} from "viem/chains";
import bs58 from "bs58";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";

// ---------- TRON HELPER ----------
function tronBase58ToHex(address) {
  const bytes = bs58.decode(address);
  return "0x" + Buffer.from(bytes).toString("hex").toUpperCase();
}

// ---------- EVM CONFIG ----------
const evmChains = {
  ethereum: mainnet,
  bnb: bsc,
  polygon: polygon,
  arbitrum: arbitrum,
  optimism: optimism,
  avalanche: avalanche,
  base: base,
  scroll: scroll,
  zksync: zkSync
};

// CoinGecko platform IDs per chain
const coingeckoPlatforms = {
  ethereum: "ethereum",
  bnb: "binance-smart-chain",
  polygon: "polygon-pos",
  arbitrum: "arbitrum-one",
  optimism: "optimistic-ethereum",
  avalanche: "avalanche",
  base: "base",
  scroll: "scroll",
  zksync: "zksync"
};

// 1inch chain IDs (only where supported)
const oneInchChainIds = {
  ethereum: 1,
  bnb: 56,
  polygon: 137,
  arbitrum: 42161,
  optimism: 10,
  avalanche: 43114,
  base: 8453
  // scroll / zksync not yet on 1inch main API
};

// Minimal ERC‑20 ABI
const erc20Abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }]
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }]
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }]
  }
];

// Minimal NFT ABI (ERC‑721 / ERC‑1155)
const nftAbi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" }
    ],
    outputs: [{ name: "balance", type: "uint256" }]
  },
  {
    type: "function",
    name: "tokenURI",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }]
  }
];

// ---------- TOKEN DISCOVERY (SMART MODE, HYBRID) ----------

// CoinGecko: top tokens for a platform (we'll cap to ~50)
async function fetchCoingeckoTokens(chainKey) {
  const platform = coingeckoPlatforms[chainKey];
  if (!platform) return [];

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1&category=&order=market_cap_desc&sparkline=false&price_change_percentage=&locale=en&x_cg_pro_api_key=&precision=full&ids=&vs_currencies=&include_platform=true`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const list = await res.json();

  const tokens = [];
  for (const item of list) {
    const platforms = item.platforms || {};
    const addr = platforms[platform];
    if (addr) {
      tokens.push({
        address: addr,
        symbol: item.symbol?.toUpperCase() || "",
        name: item.name || "",
        decimals: null,
        source: "coingecko"
      });
    }
  }

  return tokens.slice(0, 50);
}

// 1inch: token list per chain (verified tokens)
async function fetchOneInchTokens(chainKey) {
  const chainId = oneInchChainIds[chainKey];
  if (!chainId) return [];

  const url = `https://api.1inch.dev/token/v1.2/${chainId}/tokens`;
  const res = await fetch(url, {
    headers: {
      // "Authorization": `Bearer ${process.env.ONEINCH_API_KEY || ""}`
    },
    next: { revalidate: 3600 }
  });

  if (!res.ok) return [];

  const json = await res.json();
  const tokens = [];

  for (const addr in json) {
    const t = json[addr];
    tokens.push({
      address: addr,
      symbol: t.symbol?.toUpperCase() || "",
      name: t.name || "",
      decimals: t.decimals ?? null,
      source: "1inch"
    });
  }

  return tokens.slice(0, 50);
}

// Merge CoinGecko + 1inch, dedupe by address
function mergeTokenLists(listA, listB) {
  const map = new Map();

  for (const t of [...listA, ...listB]) {
    const key = t.address.toLowerCase();
    if (!map.has(key)) {
      map.set(key, t);
    } else {
      const existing = map.get(key);
      map.set(key, {
        ...existing,
        symbol: existing.symbol || t.symbol,
        name: existing.name || t.name,
        decimals: existing.decimals ?? t.decimals ?? null
      });
    }
  }

  return Array.from(map.values());
}

// Fetch ERC‑20 balances for a wallet on a given EVM chain
async function fetchEvmTokenBalances(client, chainKey, address) {
  try {
    const [cgTokens, oneInchTokens] = await Promise.all([
      fetchCoingeckoTokens(chainKey),
      fetchOneInchTokens(chainKey)
    ]);

    const merged = mergeTokenLists(cgTokens, oneInchTokens);

    const tokensWithBalance = [];

    for (const token of merged) {
      try {
        const contractAddress = token.address;
        const [rawBalance, decimals, symbol] = await Promise.all([
          client.readContract({
            address: contractAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address]
          }),
          token.decimals != null
            ? Promise.resolve(token.decimals)
            : client.readContract({
                address: contractAddress,
                abi: erc20Abi,
                functionName: "decimals"
              }),
          token.symbol
            ? Promise.resolve(token.symbol)
            : client.readContract({
                address: contractAddress,
                abi: erc20Abi,
                functionName: "symbol"
              })
        ]);

        const dec = Number(decimals);
        const raw = BigInt(rawBalance.toString());
        if (raw === 0n) continue;

        const human = Number(raw) / 10 ** dec;

        tokensWithBalance.push({
          chain: chainKey,
          address: contractAddress,
          symbol: String(symbol).toUpperCase(),
          name: token.name || "",
          decimals: dec,
          balance: human,
          balanceRaw: raw.toString()
        });
      } catch {
        // ignore individual token errors
      }
    }

    return tokensWithBalance;
  } catch {
    return [];
  }
}

// ---------- NFT ENGINE (SMART MODE + HYBRID) ----------

// Basic guess: some popular NFT contracts per chain (you can expand later)
const knownNftContracts = {
  ethereum: [
    // Pudgy Penguins, etc. (examples)
    "0xbd3531da5cf5857e7cfaa92426877b022e612cf8" // Pudgy Penguins
  ],
  polygon: [],
  bnb: [],
  arbitrum: [],
  optimism: [],
  avalanche: [],
  base: [],
  scroll: [],
  zksync: []
};

// Resolve IPFS / gateway URLs
function resolveMetadataUrl(url) {
  if (!url) return null;
  if (url.startsWith("ipfs://")) {
    const hash = url.replace("ipfs://", "");
    return `https://ipfs.io/ipfs/${hash}`;
  }
  return url;
}

// Alchemy NFT metadata fallback
async function fetchAlchemyNftMetadata(chainKey, contract, tokenId) {
  if (!ALCHEMY_API_KEY) return null;

  const networkMap = {
    ethereum: "eth-mainnet",
    polygon: "polygon-mainnet",
    arbitrum: "arb-mainnet",
    optimism: "opt-mainnet",
    base: "base-mainnet"
    // others not fully covered by Alchemy NFT yet
  };

  const network = networkMap[chainKey];
  if (!network) return null;

  const url = `https://${network}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${contract}&tokenId=${tokenId}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;

  const json = await res.json();

  return {
    name: json.title || json.rawMetadata?.name || "",
    image:
      json.media?.[0]?.gateway ||
      json.media?.[0]?.raw ||
      json.rawMetadata?.image ||
      "",
    collection: json.contractMetadata?.name || "",
    attributes: json.rawMetadata?.attributes || []
  };
}

// Fetch NFT metadata via on‑chain tokenURI + JSON
async function fetchOnChainNftMetadata(client, contract, tokenId) {
  try {
    const uri = await client.readContract({
      address: contract,
      abi: nftAbi,
      functionName: "tokenURI",
      args: [BigInt(tokenId)]
    });

    const resolved = resolveMetadataUrl(String(uri));
    if (!resolved) return null;

    const res = await fetch(resolved, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const json = await res.json();

    return {
      name: json.name || "",
      image: resolveMetadataUrl(json.image || ""),
      collection: json.collection || json.series || "",
      attributes: json.attributes || []
    };
  } catch {
    return null;
  }
}

// Smart Mode NFT fetch for a wallet on a given EVM chain
async function fetchEvmNfts(client, chainKey, address) {
  const contracts = knownNftContracts[chainKey] || [];
  if (!contracts.length) return [];

  const nfts = [];

  for (const contract of contracts) {
    try {
      const rawBalance = await client.readContract({
        address: contract,
        abi: nftAbi,
        functionName: "balanceOf",
        args: [address]
      });

      const balance = BigInt(rawBalance.toString());
      if (balance === 0n) continue;

      // For simplicity: assume token IDs 1..balance (good enough for now)
      const count = Number(balance);
      const maxTokens = Math.min(count, 10); // Smart cap

      for (let i = 1; i <= maxTokens; i++) {
        const tokenId = String(i);

        // On‑chain first
        let meta =
          (await fetchOnChainNftMetadata(client, contract, tokenId)) || null;

        // Fallback to Alchemy
        if (!meta) {
          meta =
            (await fetchAlchemyNftMetadata(chainKey, contract, tokenId)) || {
              name: "",
              image: "",
              collection: "",
              attributes: []
            };
        }

        nfts.push({
          chain: chainKey,
          contract,
          tokenId,
          standard: "erc721",
          owned: true,
          name: meta.name || `#${tokenId}`,
          collection: meta.collection || "",
          image: meta.image || "",
          attributes: meta.attributes || [],
          detailMode: "standard"
        });
      }
    } catch {
      // ignore per‑contract errors
    }
  }

  return nfts;
}

// ---------- MAIN HANDLER ----------
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const chain = searchParams.get("chain");

  if (!address || !chain) {
    return NextResponse.json(
      { error: "Missing address or chain" },
      { status: 400 }
    );
  }

  // ---------- SOLANA ----------
  if (chain === "solana") {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const pubkey = new PublicKey(address);
      const balanceLamports = await connection.getBalance(pubkey);
      const sol = balanceLamports / 1_000_000_000;

      return NextResponse.json({
        address,
        chain,
        chainType: "non-evm",
        balance: sol,
        symbol: "SOL",
        tokens: [],
        tokensGrouped: null,
        tokensFlat: [],
        nfts: [],
        nftsFlat: []
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid Solana address", details: err.message },
        { status: 400 }
      );
    }
  }

  // ---------- TON ----------
  if (chain === "ton") {
    try {
      const tonRes = await fetch(
        `https://toncenter.com/api/v2/getAddressBalance?address=${address}`
      );
      const tonJson = await tonRes.json();

      if (!tonJson.ok) {
        return NextResponse.json(
          { error: "Invalid TON address" },
          { status: 400 }
        );
      }

      const nano = Number(tonJson.result);
      const ton = nano / 1_000_000_000;

      return NextResponse.json({
        address,
        chain,
        chainType: "non-evm",
        balance: ton,
        symbol: "TON",
        tokens: [],
        tokensGrouped: null,
        tokensFlat: [],
        nfts: [],
        nftsFlat: []
      });
    } catch (err) {
      return NextResponse.json(
        { error: "TON RPC error", details: err.message },
        { status: 500 }
      );
    }
  }

  // ---------- TRON ----------
  if (chain === "tron") {
    try {
      const hexAddress = tronBase58ToHex(address).replace(/^0x/, "");

      const tronRes = await fetch(
        `https://api.trongrid.io/v1/accounts/${hexAddress}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0"
          }
        }
      );

      const tronJson = await tronRes.json();

      if (!tronJson.data || tronJson.data.length === 0) {
        return NextResponse.json(
          { error: "Invalid TRON address or no account found" },
          { status: 400 }
        );
      }

      const balanceSun = tronJson.data[0].balance || 0;
      const trx = balanceSun / 1_000_000;

      return NextResponse.json({
        address,
        chain,
        chainType: "non-evm",
        balance: trx,
        symbol: "TRX",
        tokens: [],
        tokensGrouped: null,
        tokensFlat: [],
        nfts: [],
        nftsFlat: []
      });
    } catch (err) {
      return NextResponse.json(
        { error: "TRON RPC error", details: err.message },
        { status: 500 }
      );
    }
  }

  // ---------- SUI ----------
  if (chain === "sui") {
    try {
      const suiRes = await fetch("https://fullnode.mainnet.sui.io:443", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "suix_getBalance",
          params: [address]
        })
      });

      const suiJson = await suiRes.json();

      if (!suiJson.result) {
        return NextResponse.json(
          { error: "Invalid SUI address or no account found" },
          { status: 400 }
        );
      }

      const balanceMist = Number(suiJson.result.totalBalance || 0);
      const sui = balanceMist / 1_000_000_000;

      return NextResponse.json({
        address,
        chain,
        chainType: "non-evm",
        balance: sui,
        symbol: "SUI",
        tokens: [],
        tokensGrouped: null,
        tokensFlat: [],
        nfts: [],
        nftsFlat: []
      });
    } catch (err) {
      return NextResponse.json(
        { error: "SUI RPC error", details: err.message },
        { status: 500 }
      );
    }
  }

  // ---------- BITCOIN ----------
  if (chain === "bitcoin") {
    try {
      const btcRes = await fetch(
        `https://blockstream.info/api/address/${address}`
      );
      const btcJson = await btcRes.json();

      const confirmed =
        btcJson.chain_stats.funded_txo_sum -
        btcJson.chain_stats.spent_txo_sum;
      const unconfirmed =
        btcJson.mempool_stats.funded_txo_sum -
        btcJson.mempool_stats.spent_txo_sum;

      const btc = (confirmed + unconfirmed) / 100_000_000;

      return NextResponse.json({
        address,
        chain,
        chainType: "non-evm",
        balance: btc,
        symbol: "BTC",
        confirmed,
        unconfirmed,
        tokens: [],
        tokensGrouped: null,
        tokensFlat: [],
        nfts: [],
        nftsFlat: []
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Bitcoin API error", details: err.message },
        { status: 500 }
      );
    }
  }

  // ---------- APTOS ----------
  if (chain === "aptos") {
    try {
      const aptosRes = await fetch(
        `https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resources`
      );
      const aptosJson = await aptosRes.json();

      if (!Array.isArray(aptosJson)) {
        return NextResponse.json(
          { error: "Invalid Aptos address or no resources found" },
          { status: 400 }
        );
      }

      let aptBalance = 0;
      const tokens = [];

      for (const r of aptosJson) {
        if (r.type.includes("0x1::coin::CoinStore")) {
          const coinType = r.type.split("<")[1].replace(">", "");
          const amount = Number(r.data.coin.value || 0);

          if (coinType === "0x1::aptos_coin::AptosCoin") {
            aptBalance = amount / 1_000_000_000;
          } else {
            tokens.push({
              coinType,
              amount
            });
          }
        }
      }

      return NextResponse.json({
        address,
        chain,
        chainType: "non-evm",
        balance: aptBalance,
        symbol: "APT",
        tokens,
        tokensGrouped: null,
        tokensFlat: [],
        nfts: [],
        nftsFlat: []
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Aptos RPC error", details: err.message },
        { status: 500 }
      );
    }
  }

  // ---------- EVM (TOKENS + NFT ENGINE) ----------
  if (evmChains[chain]) {
    try {
      const client = createPublicClient({
        chain: evmChains[chain],
        transport: http()
      });

      // Native balance
      const balanceWei = await client.getBalance({ address });
      const nativeBalance = Number(formatEther(balanceWei));
      const nativeSymbol = evmChains[chain].nativeCurrency.symbol;

      // Token balances
      const tokenBalances = await fetchEvmTokenBalances(
        client,
        chain,
        address
      );

      // NFT balances (Smart Mode)
      const nftBalances = await fetchEvmNfts(client, chain, address);

      // Grouped tokens
      const tokensGrouped = {
        chain,
        native: {
          symbol: nativeSymbol,
          balance: nativeBalance,
          balanceWei: balanceWei.toString()
        },
        tokens: tokenBalances.map((t) => ({
          symbol: t.symbol,
          name: t.name,
          address: t.address,
          decimals: t.decimals,
          balance: t.balance,
          balanceRaw: t.balanceRaw
        }))
      };

      // Flat tokens
      const tokensFlat = [
        {
          chain,
          symbol: nativeSymbol,
          balance: nativeBalance,
          type: "native"
        },
        ...tokenBalances.map((t) => ({
          chain,
          symbol: t.symbol,
          balance: t.balance,
          type: "erc20",
          address: t.address
        }))
      ];

      // Flat NFTs
      const nftsFlat = nftBalances.map((n) => ({
        chain: n.chain,
        contract: n.contract,
        tokenId: n.tokenId,
        owned: n.owned
      }));

      return NextResponse.json({
        address,
        chain,
        chainType: "evm",
        balance: nativeBalance,
        symbol: nativeSymbol,
        tokens: tokensGrouped.tokens,
        tokensGrouped,
        tokensFlat,
        nfts: nftBalances,
        nftsFlat
      });
    } catch (err) {
      return NextResponse.json(
        {
          error: "Invalid EVM address or token/NFT fetch error",
          details: err.message
        },
        { status: 400 }
      );
    }
  }

  // ---------- DEFAULT ----------
  return NextResponse.json({
    address,
    chain,
    chainType: "unknown",
    balance: 0,
    tokens: [],
    tokensGrouped: null,
    tokensFlat: [],
    nfts: [],
    nftsFlat: []
  });
}
