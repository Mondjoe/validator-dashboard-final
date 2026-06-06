export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const { chain, action } = await req.json();

  const map: any = {
    backup: "snapshot-backup",
    restore: "snapshot-restore",
    prune: "snapshot-prune",
  };

  const command = map[action];

  const res = await fetch("/api/secure-run", {
    method: "POST",
    body: JSON.stringify({ chain, command }),
  });

  const data = await res.json();
  return Response.json(data);
}