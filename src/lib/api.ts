export async function api(path: string) {
  const res = await fetch(`http://localhost:3000/${path}`);
  return res.json();
}