import { signMessage } from "@wagmi/core";
import { config } from "@/lib/wagmiConfig";

export async function signEvm(message: string) {
  return await signMessage(config, { message });
}
