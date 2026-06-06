"use client";

export default function ToolsPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Tools Hub</h1>

      <p className="text-gray-400 mb-8">
        Multi‑chain utilities, governance helpers, and capsule tools — all in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Chain Utilities */}
        <div className="bg-[#111] p-6 rounded-lg border border-[#222] hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-3">🔧 Chain Utilities</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/tools/address-converter" className="text-blue-400 hover:underline">
                • Address Converter
              </a>
            </li>
            <li>
              <a href="/tools/tx-status" className="text-blue-400 hover:underline">
                • Transaction Status Checker
              </a>
            </li>
            <li>
              <a href="/tools/tx-decoder" className="text-blue-400 hover:underline">
                • Transaction Decoder
              </a>
            </li>
            <li>
              <a href="/tools/ens" className="text-blue-400 hover:underline">
                • ENS Lookup
              </a>
            </li>
          </ul>
        </div>

        {/* Governance Tools */}
        <div className="bg-[#111] p-6 rounded-lg border border-[#222] hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-3">🏛 Governance Tools</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/tools/proposal-formatter" className="text-blue-400 hover:underline">
                • Proposal Formatter
              </a>
            </li>
            <li>
              <a href="/tools/snapshot-helper" className="text-blue-400 hover:underline">
                • Snapshot Helper
              </a>
            </li>
            <li>
              <a href="/tools/voting-power" className="text-blue-400 hover:underline">
                • Voting Power Calculator
              </a>
            </li>
          </ul>
        </div>

        {/* Capsule Tools */}
        <div className="bg-[#111] p-6 rounded-lg border border-[#222] hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-3">🧰 Capsule Tools</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/tools/metadata-viewer" className="text-blue-400 hover:underline">
                • Metadata Viewer
              </a>
            </li>
            <li>
              <a href="/tools/capsule-export" className="text-blue-400 hover:underline">
                • Capsule Export
              </a>
            </li>
            <li>
              <a href="/tools/identity-preview" className="text-blue-400 hover:underline">
                • Identity Preview
              </a>
            </li>
          </ul>
        </div>

        {/* Developer Tools */}
        <div className="bg-[#111] p-6 rounded-lg border border-[#222] hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-3">🛠 Developer Tools</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/tools/json-formatter" className="text-blue-400 hover:underline">
                • JSON Formatter
              </a>
            </li>
            <li>
              <a href="/tools/abi-viewer" className="text-blue-400 hover:underline">
                • ABI Viewer
              </a>
            </li>
            <li>
              <a href="/tools/contract-inspector" className="text-blue-400 hover:underline">
                • Contract Inspector
              </a>
            </li>
          </ul>
        </div>

        {/* System Tools */}
        <div className="bg-[#111] p-6 rounded-lg border border-[#222] hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-3">🧹 System Tools</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/tools/system" className="text-blue-400 hover:underline">
                • System Tools
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
