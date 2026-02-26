'use client';

import { useState } from 'react';
import ChainSelector from '../../components/ChainSelector';
import WalletCard from '../../components/WalletCard';

const CHAINS = [
  { id: 'solana', label: 'Solana' },
  { id: 'ethereum', label: 'Ethereum' },
  { id: 'base', label: 'Base' },
  { id: 'optimism', label: 'Optimism' },
  { id: 'ton', label: 'TON' },
  { id: 'tron', label: 'TRON' },
  { id: 'bitcoin', label: 'Bitcoin' }
];

export default function DashboardPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('solana');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    setData(null);

    if (!wallet.trim()) {
      setError('Please enter a wallet address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/${chain}?address=${encodeURIComponent(wallet.trim())}`);
      if (!res.ok) throw new Error('Failed to fetch wallet data');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '32px 16px', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Charm Capsule – Multi‑Chain Wallet Dashboard</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        Enter any wallet address and select a chain to view balances, tokens, and basic status.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <input
          value={wallet}
          onChange={e => setWallet(e.target.value)}
          placeholder="Paste wallet address (Solana / EVM / TON / TRON / BTC)"
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #374151',
            background: '#020617',
            color: '#e5e7eb'
          }}
        />

        <ChainSelector chains={CHAINS} value={chain} onChange={setChain} />

        <button
          onClick={handleFetch}
          disabled={loading}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: 'none',
            background: loading ? '#4b5563' : '#22c55e',
            color: '#020617',
            fontWeight: 600,
            cursor: loading ? 'default' : 'pointer'
          }}
        >
          {loading ? 'Loading…' : 'Fetch Wallet Data'}
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: 16, color: '#f97373' }}>
          {error}
        </div>
      )}

      < <WalletCard data={data} chain={chain} logo={`/logos/${chain}.png'}/>
      )}
      </div>
  ;

