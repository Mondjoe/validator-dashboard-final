export const metadata = {
  title: 'Charm Capsule – Multi‑Chain Wallet Dashboard',
  description: 'Multi‑chain wallet dashboard for Solana, Ethereum, Base, Optimism, TON, TRON, and Bitcoin.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif', background: '#050816', color: '#e5e7eb' }}>
        {children}
      </body>
    </html>
  );
}
