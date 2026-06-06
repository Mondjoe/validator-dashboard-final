"use client";

import { useState } from "react";

export default function ContractInspector() {
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState<any>(null);
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

  const getBytecode = async (addr: string) => {
    const res = await fetch(rpc, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getCode",
        params: [addr, "latest"],
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
    const erc721 = await call(addr, "0x80ac58cd");
    const erc1155 = await call(addr, "0xd9b67a26");

    if (erc721 && erc721 !== "0x") return "ERC721";
    if (erc1155 && erc1155 !== "0x") return "ERC1155";
    return "ERC20";
  };

  const inspect = async () => {
    if (!address) return;

    setLoading(true);
    setInfo(null);

    try {
      const type = await detectType(address);

      const nameHex = await call(address, "0x06fdde03");
      const symbolHex = await call(address, "0x95d89b41");
      const decimalsHex = await call(address, "0x313ce567");
      const supplyHex = await call(address, "0x18160ddd");

      const ownerHex = await call(address, "0x8da5cb5b"); // owner()

      const bytecode = await getBytecode(address);

      const balanceHex = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [address, "latest"],
        }),
      }).then((r) => r.json());

      const balance = parseInt(balanceHex.result, 16) / 1e18;

      setInfo({
        type,
        name: decodeString(nameHex),
        symbol: decodeString(symbolHex),
        decimals: decodeUint(decimalsHex),
        totalSupply: decodeUint(supplyHex),
        owner:
          ownerHex && ownerHex !== "0x"
            ? "0x" + ownerHex.slice(26)
            : "Not available",
        bytecodeSize: bytecode.length / 2,
        balance,
      });
    } catch (err) {
      setInfo({ error: "Failed to inspect contract" });
    }

    setLoading(false);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Contract Inspector</h1>

      <div className="space-y-4">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter contract address"
          className="bg-black border border-[#333] p-3 rounded w-full"
        />

        <button
          onClick={inspect}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Inspecting..." : "Inspect Contract"}
        </button>

        {info && (
          <div className="mt-6 bg-[#111] p-4 rounded border border-[#222] space-y-2">
            {info.error && <p className="text-red-400">{info.error}</p>}

            {!info.error && (
              <>
                <p><strong>Type:</strong> {info.type}</p>
                <p><strong>Name:</strong> {info.name || "N/A"}</p>
                <p><strong>Symbol:</strong> {info.symbol || "N/A"}</p>
                <p><strong>Decimals:</strong> {info.decimals ?? "N/A"}</p>
                <p><strong>Total Supply:</strong> {info.totalSupply?.toLocaleString() ?? "N/A"}</p>
                <p><strong>Owner:</strong> {info.owner}</p>
                <p><strong>Bytecode Size:</strong> {info.bytecodeSize} bytes</p>
                <p><strong>ETH Balance:</strong> {info.balance} ETH</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
