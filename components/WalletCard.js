import { formatBalance } from '../lib/format';

export default function WalletCard({ data, chain }) {
  if (!data) {
    return (
      <div style={{ opacity: 0.6 }}>
        No data yet. Enter a wallet and click “Fetch Wallet Data”.
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
      <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>
        {chain.toUpperCase()} Wallet
      </h2>

      <div style={{ fontSize: 13, opacity: 0.8, wordBreak: 'break-all', marginBottom: 12 }}>
        {data.address}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div>
          <strong>Native Balance:</strong>{' '}
          {formatBalance(data.nativeBalance, data.symbol)}
        </div>

        {Array.isArray(data.tokens) && data.tokens.length > 0 && (
          <div>
            <strong>Tokens:</strong>
            <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
              {data.tokens.map((t, i) => (
                <li key={i}>
                  {t.symbol || 'TOKEN'} – {formatBalance(t.balance, t.symbol)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.note && (
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
            {data.note}
          </div>
        )}
      </div>
    </section>
  );
}
