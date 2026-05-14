/*
 * DESIGN: Cyberpunk Noir — Settings
 * - Wallet connection settings
 * - Notification preferences
 * - Display options
 */

import DashboardLayout from '@/components/DashboardLayout';
import { walletAddressFull } from '@/lib/mockData';
import { Bell, Copy, Eye, Globe, Moon, Shield, Wallet } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/[0.05] last:border-0">
      <div>
        <div className="text-sm text-white/80">{label}</div>
        {description && <div className="text-xs text-white/30 mt-0.5">{description}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className="relative w-10 h-5 rounded-full transition-all duration-200"
      style={{ background: on ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.1)' }}
    >
      <div
        className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200"
        style={{
          left: on ? '22px' : '2px',
          background: on ? '#00F5FF' : 'rgba(255,255,255,0.4)',
          boxShadow: on ? '0 0 8px rgba(0,245,255,0.6)' : 'none',
        }}
      />
    </button>
  );
}

export default function Settings() {
  return (
    <DashboardLayout title="Settings" subtitle="Wallet, notifications, and display preferences">
      <div className="max-w-2xl space-y-6">
        {/* Wallet */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,245,255,0.1)' }}>
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#00F5FF]" />
            <span className="text-sm font-bold text-white">Wallet Connection</span>
          </div>
          <div className="px-5">
            <SettingRow label="Connected Wallet" description="Ethereum Mainnet">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#00F5FF]">{walletAddressFull.slice(0, 10)}...{walletAddressFull.slice(-6)}</span>
                <button onClick={() => { navigator.clipboard.writeText(walletAddressFull); toast.success('Address copied!'); }} className="text-white/30 hover:text-[#00F5FF] transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </SettingRow>
            <SettingRow label="Network" description="Switch between mainnet and testnets">
              <select className="text-xs bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-lg px-2 py-1 text-white/70 focus:outline-none focus:border-[rgba(0,245,255,0.3)]">
                <option>Ethereum Mainnet</option>
                <option>Polygon</option>
                <option>BNB Chain</option>
                <option>Goerli Testnet</option>
              </select>
            </SettingRow>
            <SettingRow label="Auto-connect on startup">
              <Toggle defaultOn={true} />
            </SettingRow>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.1)' }}>
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-sm font-bold text-white">Notifications</span>
          </div>
          <div className="px-5">
            <SettingRow label="Transaction Alerts" description="Get notified on confirmed transactions">
              <Toggle defaultOn={true} />
            </SettingRow>
            <SettingRow label="Price Alerts" description="Notify when tokens move ±10%">
              <Toggle defaultOn={true} />
            </SettingRow>
            <SettingRow label="NFT Floor Price Changes" description="Monitor collection floor prices">
              <Toggle defaultOn={false} />
            </SettingRow>
            <SettingRow label="Gas Price Alerts" description="Alert when gas drops below threshold">
              <Toggle defaultOn={true} />
            </SettingRow>
          </div>
        </div>

        {/* Display */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(57,255,20,0.1)' }}>
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#39FF14]" />
            <span className="text-sm font-bold text-white">Display</span>
          </div>
          <div className="px-5">
            <SettingRow label="Currency" description="Display values in">
              <select className="text-xs bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-lg px-2 py-1 text-white/70 focus:outline-none focus:border-[rgba(0,245,255,0.3)]">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>ETH (⟠)</option>
                <option>BTC (₿)</option>
              </select>
            </SettingRow>
            <SettingRow label="Hide small balances" description="Hide tokens under $1 value">
              <Toggle defaultOn={false} />
            </SettingRow>
            <SettingRow label="Compact numbers" description="Show 1.2K instead of 1,200">
              <Toggle defaultOn={true} />
            </SettingRow>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,107,0,0.1)' }}>
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-sm font-bold text-white">Security</span>
          </div>
          <div className="px-5">
            <SettingRow label="Transaction Simulation" description="Preview transactions before signing">
              <Toggle defaultOn={true} />
            </SettingRow>
            <SettingRow label="Phishing Protection" description="Warn about suspicious contracts">
              <Toggle defaultOn={true} />
            </SettingRow>
            <SettingRow label="Disconnect Wallet" description="Remove wallet connection">
              <button
                onClick={() => toast.error('Wallet disconnected', { description: 'Feature coming soon' })}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#FF006E] bg-[rgba(255,0,110,0.1)] border border-[rgba(255,0,110,0.2)] hover:bg-[rgba(255,0,110,0.2)] transition-colors"
              >
                Disconnect
              </button>
            </SettingRow>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
