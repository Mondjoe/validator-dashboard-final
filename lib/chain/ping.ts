// EVM (Ethereum)
export async function pingEvm() {
  const start = performance.now();
  try {
    await fetch("https://rpc.ankr.com/eth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
        params: []
      })
    });

    return performance.now() - start;
  } catch {
    return null;
  }
}

// Solana
export async function pingSolana() {
  const start = performance.now();
  try {
    await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getHealth"
      })
    });

    return performance.now() - start;
  } catch {
    return null;
  }
}

// TON
export async function pingTon() {
  const start = performance.now();
  try {
    await fetch("https://toncenter.com/api/v2/jsonRPC", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getMasterchainInfo"
      })
    });

    return performance.now() - start;
  } catch {
    return null;
  }
}

// TRON
export async function pingTron() {
  const start = performance.now();
  try {
    await fetch("https://api.trongrid.io/wallet/getnowblock", {
      method: "POST"
    });

    return performance.now() - start;
  } catch {
    return null;
  }
}
