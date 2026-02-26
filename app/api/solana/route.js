import { NextResponse } from 'next/server';

const RPC = "https://api.mainnet-beta.solana.com";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  try {
    // 1) Fetch native SOL balance
    const balanceRes = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [address]
      })
    });

    const balanceJson = await balanceRes.json();

    if (balanceJson.error) {
      return NextResponse.json({
        error: "Invalid Solana address or RPC error",
        details: balanceJson.error
      }, { status: 400 });
    }

    const lamports = balanceJson.result?.value || 0;
    const sol = lamports / 1_000_000_000;

    // 2) Fetch token accounts
    const tokenRes = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "getTokenAccountsByOwner",
        params: [
          address,
          { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
          { encoding: "jsonParsed" }
        ]
      })
    });

    const tokenJson = await tokenRes.json();

    const tokens = (tokenJson.result?.value || []).map(t => {
      const info = t.account.data.parsed.info;
      const amount = info.tokenAmount.uiAmount;
      const symbol = info.mint.slice(0, 4) + "..."; // simple mint preview
      return { symbol, balance: amount };
    });

    return NextResponse.json({
      address,
      chain: "solana",
      nativeBalance: sol,
      symbol: "SOL",
      tokens,
      note: "Live Solana RPC data"
    });

  } catch (err) {
    return NextResponse.json({
      error: "Unexpected server error",
      details: err.message
    }, { status: 500 });
  }
}
