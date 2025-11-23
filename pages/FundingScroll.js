import { validatorConfig } from "../config";

export default function FundingScroll() {
  const { title, wallets, status } = validatorConfig.fundingScroll;
  return (
    <div>
      <h2>{title}</h2>
      {wallets.map((w, i) => (
        <p key={i}>{w.address} → {w.amount} (Tier {w.tier})</p>
      ))}
      <p>Status: {status}</p>
    </div>
  );
}
