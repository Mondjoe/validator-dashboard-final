"use client";

import { useState } from "react";

export default function MetadataViewer() {
  const [address, setAddress] = useState("");
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const rpc = "https://eth.llamarpc.com";

  const call = async (to: string, data: string) => {
    const res = await fetch(rpc, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [{ to, data }, "latest"],
      }),
    });
    const json = await res.json();
    return json.result;
  };

  const decodeString = (hex: string) => {
    if (!hex || hex === "0x") return null;
    try {
      const str = Buffer.from(hex.replace("0x", ""), "hex").toString();
      return str.replace(/[^\x20-\x7E]/g, "").trim();
    } catch {
      return null;
    }
  };

  const decodeUint = (hex: string) => {
    if (!hex || hex === "0x") return null;
    return parseInt(hex, 16);
  };

  const detectType = async (addr: string) => {
    const erc721 = await call(addr, "0x80ac58cd"); // supportsInterface(ERC721)
    const erc1155 = await call(addr, "0xd9b67a26"); // supportsInterface(ERC1155)

    if (erc721 && erc721 !== "0x") return "ERC721";
    if (erc1155 && erc1155 !== "0x") return "ERC1155";
    return "ERC20";
  };

  const fetchMetadata = async () => {
    if (!address) return;

    setLoading(true);
    setMeta(null);

    try {
      const nameHex = await call(address, "0x06fdde03"); // name()
      const symbolHex = await call(address, "0x95d89b41"); // symbol()
      const decimalsHex = await call(address, "0x313ce567"); // decimals()
      const supplyHex = await call(address, "0x18160ddd"); // totalSupply()

      const type = await detectType(address);

      setMeta({
        type,
        name: decodeString(nameHex),
        symbol: decodeString(symbolHex),
        decimals: decodeUint(decimalsHex),
        totalSupply: decodeUint(supplyHex),
      });
    } catch (err) {
      setMeta({ error: "Failed to fetch metadata" });
    }

    setLoading(false);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Token Metadata Viewer</h1>

      <div className="space-y-4">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter contract address"
          className="bg-black border border-[#333] p-3 rounded w-full"
        />

        <button
          onClick={fetchMetadata}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Fetch Metadata"}
        </button>

        {meta && (
          <div className="mt-6 bg-[#111] p-4 rounded border border-[#222] space-y-2">
            {meta.error && <p className="text-red-400">{meta.error}</p>}

            {!meta.error && (
              <>
                <p><strong>Type:</strong> {meta.type}</p>
                <p><strong>Name:</strong> {meta.name || "N/A"}</p>
                <p><strong>Symbol:</strong> {meta.symbol || "N/A"}</p>
                <p><strong>Decimals:</strong> {meta.decimals ?? "N/A"}</p>
                <p><strong>Total Supply:</strong> {meta.totalSupply?.toLocaleString() ?? "N/A"}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
