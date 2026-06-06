export const dynamic = "force-dynamic";
import { diagnose } from "@/lib/diagnostics";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");
  const validator = searchParams.get("validator");

  // Fetch alerts
  const alertsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/alerts?chain=${chain}&validator=${validator}`
  );
  const alerts = await alertsRes.json();

  // Fetch sync drift
  const syncRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sync?chain=${chain}`
  );
  const sync = await syncRes.json();

  const lag = sync.nodes?.find((n: any) => n.id === "main")?.lag || 0;

  // Fetch system metrics
  const sysRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/system`
  );
  const sys = await sysRes.json();

  // RPC failover status
  const rpcFail = alerts.alerts?.includes("ETH RPC unreachable") ||
                  alerts.alerts?.includes("TON RPC unreachable") ||
                  alerts.alerts?.includes("TRON RPC unreachable");

  const result = diagnose({
    cpu: sys.cpu,
    ram: sys.ram,
    disk: sys.disk,
    lag,
    rpcFail,
    alerts: alerts.alerts
  });

  return Response.json(result);
}