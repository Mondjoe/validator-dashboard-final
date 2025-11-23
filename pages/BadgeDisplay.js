import { validatorConfig } from "../config";

export default function BadgeDisplay() {
  const { badgeId, theme, location, status } = validatorConfig.snapshot;
  return (
    <div>
      <h2>Validator Badge</h2>
      <p>ID: {badgeId}</p>
      <p>Theme: {theme}</p>
      <p>Location: {location}</p>
      <p>Status: {status}</p>
    </div>
  );
}
