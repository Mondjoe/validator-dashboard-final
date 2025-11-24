import { useState } from "react";
import { ethers } from "ethers";
import { validatorConfig } from "../config";

const badgeABI = [
  "function mint(address to, uint256 badgeId) public"
];

const badgeContractAddress = "0x29403B1AC2B745c806e4d4988e4C1B6F4c119b95";

export default function MintBadge() {
  const [status, setStatus] = useState("");

  async function handleMint() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(badgeContractAddress, badgeABI, signer);

      const wallet = await signer.getAddress();
      const badgeId = validatorConfig.snapshot.badgeId;

      const tx = await contract.mint(wallet, badgeId);
      await tx.wait();

      setStatus("✅ Badge minted successfully!");
    } catch (err) {
      setStatus("❌ Mint failed: " + err.message);
    }
  }

  return (
    <div>
      <button onClick={handleMint}>Mint Validator Badge</button>
      <p>{status}</p>
    </div>
  );
}
