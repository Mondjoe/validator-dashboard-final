import { NextResponse } from 'next/server';

const RPC = "https://optimism.llamarpc.com";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  try {
    const balanceRes = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [address, "latest"]
      })
    });

    const balanceJson = await balanceRes.json();

    if (balanceJson.error) {
      return NextResponse.json({
        error: "Invalid Optimism address or RPC error",
        details: balanceJson.error
      }, { status: 400 });
    }

    const wei = parseInt(balanceJson.result, 16);
    const eth = wei / 1e18;

    return NextResponse.json({
      address,
      chain: "optimism",
      nativeBalance: eth,
      symbol: "ETH",
      tokens: [],
      note: "Live Optimism RPC data"
    });

  } catch (err) {
    return NextResponse.json({
      error: "Unexpected server error",
      details: err.message
    }, { status: 500 });
  }
}
