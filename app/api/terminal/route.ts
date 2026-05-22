import { exec } from "child_process";

export async function POST(req: Request): Promise<Response> {
  const { command } = await req.json();

  if (!command) {
    return Response.json(
      { ok: false, error: "No command provided" },
      { status: 400 }
    );
  }

  return new Promise<Response>((resolve) => {
    exec(command, (err, stdout, stderr) => {
      resolve(
        Response.json({
          ok: !err,
          output: stdout || stderr || err?.message,
        })
      );
    });
  });
}
