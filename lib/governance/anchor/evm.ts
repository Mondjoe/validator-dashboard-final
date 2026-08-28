import { writeContract } from "@wagmi/core";
import { config } from "@/lib/wagmiConfig";

export async function anchorToEvm(hash: string) {
  const tx = await writeContract(config, {
    address: "0x0000000000000000000000000000000000000000",
    abi: [],
    functionName: undefined,
    data: `0x${hash}`,
  });

  return tx;
}
