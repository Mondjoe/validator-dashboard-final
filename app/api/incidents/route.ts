export const dynamic = "force-dynamic";
import { addIncident, loadIncidents } from "@/lib/incidentStore";

export async function GET() {
  return Response.json({ incidents: loadIncidents() });
}

export async function POST(req: Request) {
  const body = await req.json();

  addIncident({
    ...body,
    time: new Date().toISOString(),
  });

  return Response.json({ ok: true });
}