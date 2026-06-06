export async function hashEntry(entry: any) {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(entry));

  const hash = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(hash).toString("hex");
}
