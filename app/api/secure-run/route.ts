export const dynamic = "force-dynamic";
import { ALLOWED_COMMANDS } from "@/lib/allowedCommands";
import { exec } from "child_process";

export async function POST(req: Request): Promise<Response> {
  const { chain, command } = await req.json();

  const allowed = ALLOWED_COMMANDS[chain]?.[command];

  if (!allowed) {
    return Response.json(
      { ok: false, error: "Command not allowed" },
      { status: 400 }
    );
  }

  return new Promise<Response>((resolve) => {
    exec(allowed, (err, stdout, stderr) => {
      resolve(
        Response.json({
          ok: true,
          output: stdout || stderr || err?.message,
        })
      );
    });
  });
}
