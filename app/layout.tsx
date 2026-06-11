import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Charm Capsule – Validator Dashboard',
  description: 'Unified sovereign validator dashboard for Charm Capsule.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
