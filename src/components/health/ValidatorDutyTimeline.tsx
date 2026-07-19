"use client";

export function ValidatorDutyTimeline({ duties }: any) {
  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 lg:col-span-3">
      <h2 className="text-xl font-semibold mb-4">Validator Duty Timeline</h2>

      <div className="space-y-4">
        {duties.map((duty: any) => (
          <div key={duty.id} className="flex gap-4 items-start">
            <div
              className={`w-3 h-3 rounded-full mt-1 ${
                duty.status === "SUCCESS"
                  ? "bg-green-400"
                  : "bg-red-400"
              }`}
            />

            <div>
              <p className="text-neutral-200 font-semibold">
                {duty.type} — Slot {duty.slot}
              </p>
              <p className="text-neutral-400 text-sm">
                {new Date(duty.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}