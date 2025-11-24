import { validatorConfig } from "../config";

export default function Contributors() {
  return (
    <div>
      <h2>Contributors</h2>
      {validatorConfig.contributors.map((c, i) => (
        <p key={i}>
          Wallet: {c.wallet} → ID {c.contributorId}, Tier {c.tier}, Status {c.status}
        </p>
      ))}
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
import { useState } from "react";
import LanguageToggle from "../components/LanguageToggle";
import BadgeDisplay from "../components/BadgeDisplay";
import FundingScroll from "../components/FundingScroll";
import Contributors from "../components/Contributors";
import MintBadge from "../components/MintBadge";
import DarkModeToggle from "../components/DarkModeToggle";
import SnapshotExport from "../components/SnapshotExport";

export default function App() {
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <DarkModeToggle />
      <LanguageToggle setLanguage={setLanguage} />
      <h1>{language === "en" ? "Validator Dashboard Final" : "အတည်ပြုသူ ဒက်ရှ်ဘုတ်နောက်ဆုံး"}</h1>
      <BadgeDisplay />
      <FundingScroll />
      <Contributors />
      <MintBadge />
      <SnapshotExport />
    </div>
  );
}
import ContributorTrace from "../components/ContributorTrace";
import ContributorList from "../components/ContributorList";
import FarcasterEmbed from "../components/FarcasterEmbed"; // or FarcasterFeed
import SnapshotExport from "../components/SnapshotExport";
import LanguageToggle from "../components/LanguageToggle";
