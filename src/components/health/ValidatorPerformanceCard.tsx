export function ValidatorPerformanceCard({ validator }: any) {
  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-2">Validator Performance</h2>

      <p className="text-neutral-300">Index: {validator.index}</p>
      <p className="text-neutral-300">
        Participation: {(validator.participationRate * 100).toFixed(2)}%
      </p>
      <p className="text-neutral-300">
        Missed Attestations (24h): {validator.missedAttestations24h}
      </p>
      <p className="text-neutral-300">
        Proposals (24h): {validator.proposals24h}
      </p>
      <p className="text-neutral-300">
        Rewards (Day): {validator.rewardsDay}
      </p>
    </div>
  );
}