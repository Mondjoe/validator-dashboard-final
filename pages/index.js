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
