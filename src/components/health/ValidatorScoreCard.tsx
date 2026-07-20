"use client";

export function ValidatorScoreCard({ score }: any) {
  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-3">Validator Effectiveness</h2>

      <p className="text-4xl font-bold text-green-400">
        {score.effectiveness} / 100
      </p>

      <p className="text-neutral-400 mt-2">
        Health Index: {score.healthIndex}
      </p>

      <div className="w-full bg-neutral-800 h-3 rounded-lg mt-4 overflow-hidden">
        <div
          className="h-3 bg-green-500 transition-all duration-500"
          style={{ width: `${score.effectiveness}%` }}
        />
      </div>
    </div>
  );
}