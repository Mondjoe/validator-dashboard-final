export const dynamic = "force-dynamic";
import { addSessionEvent } from "@/lib/incidentStore";

export async function POST(req: Request) {
  const body = await req.json();

  addSessionEvent({
    action: body.action,
    details: body.details || null,
  });

  return Response.json({ ok: true });
}