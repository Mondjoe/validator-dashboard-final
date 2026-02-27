return (
  <div className="min-h-screen flex justify-center items-start pt-10 bg-gray-50">
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm">

      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        Charm Capsule – Multi‑Chain Wallet Dashboard
      </h1>

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

      {data && (
        <WalletCard
          data={data}
          chain={chain}
          logo={`/logos/${chain}.png`}
        />
      )}

    </div>
  </div>
);
