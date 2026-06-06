"use client";

import { useState } from "react";

export default function CapsuleExport() {
  const [capsule, setCapsule] = useState<any>({
    identity: {
      name: "",
      avatar: "",
      description: "",
    },
    wallets: [],
    chains: [],
    roles: [],
    governance: {
      votingPowerSource: "",
      snapshotSpace: "",
    },
  });

  const [output, setOutput] = useState("");

  const update = (path: string, value: any) => {
    const parts = path.split(".");
    const updated = { ...capsule };

    let obj: any = updated;
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;

    setCapsule(updated);
  };

  const exportJSON = () => {
    setOutput(JSON.stringify(capsule, null, 2));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard");
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Capsule Export</h1>

      <p className="text-gray-400 mb-6">
        Fill in your capsule identity, wallets, roles, and governance settings.
        Then export everything as a clean JSON file.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT SIDE — INPUTS */}
        <div className="space-y-6">

          {/* Identity */}
          <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
            <h2 className="text-xl font-semibold">Identity</h2>

            <input
              placeholder="Name"
              className="bg-black border border-[#333] p-3 rounded w-full"
              onChange={(e) => update("identity.name", e.target.value)}
            />

            <input
              placeholder="Avatar URL"
              className="bg-black border border-[#333] p-3 rounded w-full"
              onChange={(e) => update("identity.avatar", e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="bg-black border border-[#333] p-3 rounded w-full h-20"
              onChange={(e) => update("identity.description", e.target.value)}
            />
          </div>

          {/* Wallets */}
          <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
            <h2 className="text-xl font-semibold">Wallets</h2>

            <textarea
              placeholder="One wallet per line"
              className="bg-black border border-[#333] p-3 rounded w-full h-24"
              onChange={(e) =>
                update(
                  "wallets",
                  e.target.value.split("\n").filter(Boolean)
                )
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
                update(
                  "chains",
                  e.target.value.split("\n").filter(Boolean)
                )
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
                update(
                  "roles",
                  e.target.value.split("\n").filter(Boolean)
                )
              }
            />
          </div>

          {/* Governance */}
          <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
            <h2 className="text-xl font-semibold">Governance</h2>

            <input
              placeholder="Voting Power Source (ERC20, ERC721, etc)"
              className="bg-black border border-[#333] p-3 rounded w-full"
              onChange={(e) =>
                update("governance.votingPowerSource", e.target.value)
              }
            />

            <input
              placeholder="Snapshot Space (example: charm.eth)"
              className="bg-black border border-[#333] p-3 rounded w-full"
              onChange={(e) =>
                update("governance.snapshotSpace", e.target.value)
              }
            />
          </div>

          <button
            onClick={exportJSON}
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Export JSON
          </button>
        </div>

        {/* RIGHT SIDE — OUTPUT */}
        <div>
          {output && (
            <>
              <h2 className="text-xl font-semibold mb-3">Exported JSON</h2>

              <textarea
                value={output}
                readOnly
                className="bg-[#111] border border-[#222] p-4 rounded w-full h-96 text-gray-300"
              />

              <button
                onClick={copy}
                className="mt-3 px-6 py-3 bg-green-600 rounded hover:bg-green-700 transition"
              >
                Copy to Clipboard
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
