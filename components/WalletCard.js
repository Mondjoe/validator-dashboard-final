import Image from "next/image";
import { formatBalance } from '../lib/format';

export default function WalletCard({ data, chain, logo }) {
  if (!data) {
    return (
      <div style={{ opacity: 0.6 }}>
        No data yet. Enter a wallet and click.
      </div>
    );
  }

  return (
    <section
      style={{
        borderRadius: 16,
        border: '1px solid #1f2937',
        padding: 16,
        background: 'rgba(15,23,42,0.9)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.6)',
        marginTop: 8
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Image src={logo} alt={chain} width={24} height={24} />
        {chain.toUpperCase()} Wallet
      </h2>

      <div style={{ fontSize: 13, opacity: 0.8 }}>
        {data.address}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <strong>Native Balance:</strong>{' '}
          {formatBalance(data.nativeBalance, data.decimals)}
        </div>
      </div>
    </section>
  );
}