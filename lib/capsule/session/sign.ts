import { generateSessionKey } from "./generate";

export async function sessionSign(identity: any, message: string) {
  const session = await generateSessionKey(identity);

  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const hash = await crypto.subtle.digest("SHA-256", data);
  const signature = Buffer.from(hash).toString("hex");

  return {
    session,
    signature,
    message,
    timestamp: new Date().toISOString(),
  };
}
