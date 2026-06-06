export const dynamic = "force-dynamic";
import { rpcRequest } from "@/lib/rpcRouter";

export async function POST(req: Request) {
  const { chain, method, params } = await req.json();

  const result = await rpcRequest(chain, {
    jsonrpc: "2.0",
    id: 1,
    method,
    params,
  });

  return Response.json(result);
}