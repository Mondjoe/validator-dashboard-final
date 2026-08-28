export const dynamic = "force-dynamic";
import os from "os";
import { exec } from "child_process";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const validator = searchParams.get("validator");
  const chain = searchParams.get("chain");

  const alerts: string[] = [];

  // CPU alert
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;
  cpus.forEach((cpu) => {
    for (let type in cpu.times) total += cpu.times[type as keyof typeof cpu.times];
    idle += cpu.times.idle;
  });
  const cpuUsage = 1 - idle / total;
  if (cpuUsage > 0.85) alerts.push("High CPU usage");

  // RAM alert
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  if (freeMem / totalMem < 0.15) alerts.push("Low RAM available");

  // Disk alert
  const disk = await new Promise<any>((resolve) => {
    exec("df -h /", (err, stdout) => {
      if (err) return resolve(null);
      const parts = stdout.split("\n")[1].split(/\s+/);
      resolve({ percent: parts[4] });
    });
  });
  if (disk && parseInt(disk.percent) > 85) alerts.push("Disk almost full");

  // Chain-specific alerts
  if (chain === "ETH") {
    try {
      const res = await fetch("http://localhost:8545", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_syncing",
          params: [],
          id: 1,
        }),
      });
      const data = await res.json();
      if (data.result !== false) alerts.push("ETH node is syncing");
    } catch {
      alerts.push("ETH RPC unreachable");
    }
  }

  if (chain === "TON") {
    try {
      const res = await fetch("https://toncenter.com/api/v2/getMasterchainInfo");
      const data = await res.json();
      if (!data.ok) alerts.push("TON RPC unreachable");
    } catch {
      alerts.push("TON RPC unreachable");
    }
  }

  if (chain === "TRON") {
    try {
      const res = await fetch("https://api.trongrid.io/wallet/getnowblock");
      const data = await res.json();
      if (!data.blockID) alerts.push("TRON RPC unreachable");
    } catch {
      alerts.push("TRON RPC unreachable");
    }
  }

  return Response.json({ alerts });
}
