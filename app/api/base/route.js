import { NextResponse } from 'next/server';
import { fetchPlaceholder } from '../../../lib/rpc';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  }

  const data = await fetchPlaceholder('base', address);
  return NextResponse.json({
    ...data,
    symbol: 'ETH',
    note: 'Base endpoint placeholder – real RPC will be added next.'
  });
}
