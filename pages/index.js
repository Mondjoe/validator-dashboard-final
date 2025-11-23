import MintBadge from "../components/MintBadge";

export default function App() {
  return (
    <div>
      <DarkModeToggle />
      <h1>Validator Dashboard Final</h1>
      <BadgeDisplay />
      <FundingScroll />
      <Contributors />
      <MintBadge />
    </div>
  );
}

import DarkModeToggle from "../components/DarkModeToggle";

export default function App() {
  return (
    <div>
      <DarkModeToggle />
      <h1>Validator Dashboard Final</h1>
      <BadgeDisplay />
      <FundingScroll />
      <Contributors />
    </div>
  );
}

import BadgeDisplay from "./components/BadgeDisplay";
import FundingScroll from "./components/FundingScroll";
import Contributors from "./components/Contributors";

export default function App() {
  return (
    <div>
      <h1>Validator Dashboard Final</h1>
      <BadgeDisplay />
      <FundingScroll />
      <Contributors />
    </div>
  );
}
import { useState } from "react";
import { ethers } from "ethers";
import { validatorConfig } from "../config";

const badgeABI = [
  "function mint(address to, uint256 badgeId) public"
];

const badgeContractAddress = "0xYourBadgeContractAddress";

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
