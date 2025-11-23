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
