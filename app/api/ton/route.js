import { NextResponse } from 'next/server';

const RPC = "https://toncenter.com/api/v2/jsonRPC";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  try {
    // 1) Fetch TON account info
    const infoRes = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAddressInformation",
        params: { address }
      })
    });

    const infoJson = await infoRes.json();

    if (infoJson.error) {
      return NextResponse.json({
        error: "Invalid TON address or RPC error",
        details: infoJson.error
      }, { status: 400 });
    }

    const balanceNano = infoJson.result?.balance || "0";
    const ton = Number(balanceNano) / 1e9;

    return NextResponse.json({
      address,
      chain: "ton",
      nativeBalance: ton,
      symbol: "TON",
      tokens: [],
      note: "Live TON RPC data"
    });

  } catch (err) {
    return NextResponse.json({
      error: "Unexpected server error",
      details: err.message
    }, { status: 500 });
  }
}
