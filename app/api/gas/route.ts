export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");

  if (!chain) return Response.json({ error: "Missing chain" });

  // ETH gas
  if (chain === "ETH") {
    try {
      const res = await fetch("https://api.etherscan.io/api?module=gastracker&action=gasoracle");
      const data = await res.json();

      return Response.json({
        base: Number(data.result.SafeGasPrice),
        fast: Number(data.result.FastGasPrice),
        propose: Number(data.result.ProposeGasPrice),
        unit: "gwei",
      });
    } catch {
      return Response.json({ error: "ETH gas unavailable" });
    }
  }

  // TON gas
  if (chain === "TON") {
    try {
      const res = await fetch("https://tonapi.io/v2/blockchain/config");
      const data = await res.json();

      return Response.json({
        base: data.config?.gas_prices?.flat_gas_price || 0,
        fast: data.config?.gas_prices?.flat_gas_price || 0,
        propose: data.config?.gas_prices?.flat_gas_price || 0,
        unit: "nanotons",
      });
    } catch {
      return Response.json({ error: "TON gas unavailable" });
    }
  }

  // TRON gas (energy + bandwidth)
  if (chain === "TRON") {
    try {
      const res = await fetch("https://api.trongrid.io/wallet/getchainparameters");
      const data = await res.json();

      const energy = data.chainParameter.find((x: any) => x.key === "getEnergyFee")?.value;
      const bandwidth = data.chainParameter.find((x: any) => x.key === "getTransactionFee")?.value;

      return Response.json({
        base: energy,
        fast: energy,
        propose: energy,
        bandwidth,
        unit: "sun",
      });
    } catch {
      return Response.json({ error: "TRON gas unavailable" });
    }
  }

  return Response.json({ error: "Unknown chain" });
}