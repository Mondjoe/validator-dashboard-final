import { NextResponse } from 'next/server';

const RPC = "https://api.trongrid.io";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  try {
    // 1) Fetch TRX balance
    const balanceRes = await fetch(`${RPC}/v1/accounts/${address}`);
    const balanceJson = await balanceRes.json();

    if (!balanceJson.data || balanceJson.data.length === 0) {
      return NextResponse.json({
        error: "Invalid TRON address or no account found"
      }, { status: 400 });
    }

    const account = balanceJson.data[0];
    const trx = (account.balance || 0) / 1_000_000; // Sun → TRX

    return NextResponse.json({
      address,
      chain: "tron",
      nativeBalance: trx,
      symbol: "TRX",
      tokens: [],
      note: "Live TRON RPC data"
    });

  } catch (err) {
    return NextResponse.json({
      error: "Unexpected server error",
      details: err.message
    }, { status: 500 });
  }
}
