export async function hashSnapshot(snapshot: any) {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(snapshot));

  const hash = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(hash).toString("hex");
}
