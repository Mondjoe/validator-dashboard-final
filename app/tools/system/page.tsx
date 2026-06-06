"use client";

import { useState } from "react";

export default function SystemTools() {
  const [message, setMessage] = useState("");

  const clearLocal = () => {
    localStorage.clear();
    setMessage("Local settings cleared.");
  };

  const resetTheme = () => {
    localStorage.removeItem("theme");
    setMessage("Theme reset to default.");
  };

  const resetIdentity = () => {
    localStorage.removeItem("capsule_identity");
    setMessage("Capsule identity reset.");
  };

  const resetAll = () => {
    localStorage.clear();
    sessionStorage.clear();
    setMessage("All system data reset.");
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">System Tools</h1>

      <p className="text-gray-400 mb-6">
        Manage local settings, theme, identity, and stored data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Clear Local Settings */}
        <button
          onClick={clearLocal}
          className="bg-[#111] border border-[#333] p-6 rounded hover:border-blue-500 transition text-left"
        >
          <h2 className="text-xl font-semibold mb-2">🧹 Clear Local Settings</h2>
          <p className="text-gray-400">Remove all saved UI preferences.</p>
        </button>

        {/* Reset Theme */}
        <button
          onClick={resetTheme}
          className="bg-[#111] border border-[#333] p-6 rounded hover:border-blue-500 transition text-left"
        >
          <h2 className="text-xl font-semibold mb-2">🎨 Reset Theme</h2>
          <p className="text-gray-400">Restore default theme settings.</p>
        </button>

        {/* Reset Identity */}
        <button
          onClick={resetIdentity}
          className="bg-[#111] border border-[#333] p-6 rounded hover:border-blue-500 transition text-left"
        >
          <h2 className="text-xl font-semibold mb-2">🪪 Reset Identity</h2>
          <p className="text-gray-400">Clear Capsule identity data.</p>
        </button>

        {/* Reset All */}
        <button
          onClick={resetAll}
          className="bg-[#111] border border-[#333] p-6 rounded hover:border-blue-500 transition text-left"
        >
          <h2 className="text-xl font-semibold mb-2">💥 Reset Everything</h2>
          <p className="text-gray-400">Full wipe of all local data.</p>
        </button>

      </div>

      {message && (
        <div className="mt-6 bg-[#111] p-4 rounded border border-[#222] text-green-400">
          {message}
        </div>
      )}
    </div>
  );
}
