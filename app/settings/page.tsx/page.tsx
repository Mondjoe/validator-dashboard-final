"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("blue");
  const [language, setLanguage] = useState("en");
  const [chain, setChain] = useState("ETH");
  const [capsuleName, setCapsuleName] = useState("Charm Capsule");
  const [tagline, setTagline] = useState("Proof-Driven Governance • Multi-Chain Capsule");

  // Load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("charm-settings") || "{}");
    if (saved.theme) setTheme(saved.theme);
    if (saved.accent) setAccent(saved.accent);
    if (saved.language) setLanguage(saved.language);
    if (saved.chain) setChain(saved.chain);
    if (saved.capsuleName) setCapsuleName(saved.capsuleName);
    if (saved.tagline) setTagline(saved.tagline);
  }, []);

  // Save settings
  const saveSettings = () => {
    const data = { theme, accent, language, chain, capsuleName, tagline };
    localStorage.setItem("charm-settings", JSON.stringify(data));
    alert("Settings saved");
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Charm Capsule Control Center</h1>

      {/* Appearance */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Appearance</h2>
        <div className="space-y-3">
          <div>
            <label>Theme</label>
            <select value={theme} onChange={e => setTheme(e.target.value)} className="ml-3 bg-black p-2 rounded">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div>
            <label>Accent Color</label>
            <select value={accent} onChange={e => setAccent(e.target.value)} className="ml-3 bg-black p-2 rounded">
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="cyan">Cyan</option>
            </select>
          </div>
        </div>
      </section>

      {/* Language */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Language & Region</h2>
        <div>
          <label>Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)} className="ml-3 bg-black p-2 rounded">
            <option value="en">English</option>
          </select>
        </div>
      </section>

      {/* Wallet & Chains */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Wallet & Chains</h2>
        <div>
          <label>Default Chain</label>
          <select value={chain} onChange={e => setChain(e.target.value)} className="ml-3 bg-black p-2 rounded">
            <option value="ETH">Ethereum</option>
            <option value="BTC">Bitcoin</option>
            <option value="TRON">Tron</option>
            <option value="TON">TON</option>
            <option value="SOL">Solana</option>
            <option value="BASE">Base</option>
            <option value="BNB">BNB Chain</option>
          </select>
        </div>
      </section>

      {/* Capsule Identity */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Capsule Identity</h2>
        <div className="space-y-3">
          <div>
            <label>Name</label>
            <input
              value={capsuleName}
              onChange={e => setCapsuleName(e.target.value)}
              className="ml-3 bg-black p-2 rounded"
            />
          </div>

          <div>
            <label>Tagline</label>
            <input
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              className="ml-3 bg-black p-2 rounded w-96"
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <button
        onClick={saveSettings}
        className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Save Settings
      </button>
    </div>
  );
}
