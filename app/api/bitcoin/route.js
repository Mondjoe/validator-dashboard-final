import { NextResponse } from 'next/server';

const RPC = "https://blockchain.info/rawaddr";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  try {
    // Fetch BTC address info
    const res = await fetch(`${RPC}/${address}`);
    const json = await res.json();

    if (json.error) {
      return NextResponse.json({
        error: "Invalid Bitcoin address or RPC error",
        details: json.error
      }, { status: 400 });
    }

    const satoshis = json.final_balance || 0;
    const btc = satoshis / 100_000_000;

    return NextResponse.json({
      address,
      chain: "bitcoin",
      nativeBalance: btc,
      symbol: "BTC",
      tokens: [],
      note: "Live Bitcoin RPC data"
    });

  } catch (err) {
    return NextResponse.json({
      error: "Unexpected server error",
      details: err.message
    }, { status: 500 });
  }
}
