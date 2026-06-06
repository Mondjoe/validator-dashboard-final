"use client";

import { useState } from "react";

export default function IdentityPreview() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [wallets, setWallets] = useState<string[]>([]);
  const [chains, setChains] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Identity Preview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SIDE — INPUTS */}
        <div className="space-y-6">

          {/* Identity */}
          <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
            <h2 className="text-xl font-semibold">Identity</h2>

            <input
              placeholder="Name"
              className="bg-black border border-[#333] p-3 rounded w-full"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Avatar URL"
              className="bg-black border border-[#333] p-3 rounded w-full"
              onChange={(e) => setAvatar(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="bg-black border border-[#333] p-3 rounded w-full h-20"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Wallets */}
          <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
            <h2 className="text-xl font-semibold">Wallets</h2>

            <textarea
              placeholder="One wallet per line"
              className="bg-black border border-[#333] p-3 rounded w-full h-24"
              onChange={(e) =>
                setWallets(e.target.value.split("\n").filter(Boolean))
              }
            />
          </div>

          {/* Chains */}
          <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
            <h2 className="text-xl font-semibold">Chains</h2>

            <textarea
              placeholder="ETH, BASE, BNB, etc..."
              className="bg-black border border-[#333] p-3 rounded w-full h-20"
              onChange={(e) =>
                setChains(e.target.value.split("\n").filter(Boolean))
              }
            />
          </div>

          {/* Roles */}
          <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
            <h2 className="text-xl font-semibold">Roles</h2>

            <textarea
              placeholder="Owner, Guardian, Delegate, etc..."
              className="bg-black border border-[#333] p-3 rounded w-full h-20"
              onChange={(e) =>
                setRoles(e.target.value.split("\n").filter(Boolean))
              }
            />
          </div>

        </div>

        {/* RIGHT SIDE — LIVE PREVIEW */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>

          <div className="bg-[#111] p-6 rounded border border-[#222] space-y-4">

            {/* Avatar */}
            {avatar && (
              <img
                src={avatar}
                alt="avatar"
                className="w-24 h-24 rounded-full border border-[#333] object-cover"
              />
            )}

            {/* Name */}
            <h3 className="text-2xl font-bold">{name || "Unnamed Capsule"}</h3>

            {/* Description */}
            <p className="text-gray-400 whitespace-pre-line">
              {description || "No description provided."}
            </p>

            {/* Wallets */}
            <div>
              <h4 className="font-semibold mb-1">Wallets</h4>
              <ul className="text-gray-300 space-y-1">
                {wallets.length > 0
                  ? wallets.map((w, i) => <li key={i}>• {w}</li>)
                  : "None"}
              </ul>
            </div>

            {/* Chains */}
            <div>
              <h4 className="font-semibold mb-1">Chains</h4>
              <ul className="text-gray-300 space-y-1">
                {chains.length > 0
                  ? chains.map((c, i) => <li key={i}>• {c}</li>)
                  : "None"}
              </ul>
            </div>

            {/* Roles */}
            <div>
              <h4 className="font-semibold mb-1">Roles</h4>
              <ul className="text-gray-300 space-y-1">
                {roles.length > 0
                  ? roles.map((r, i) => <li key={i}>• {r}</li>)
                  : "None"}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
