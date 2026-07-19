"use client";

export function NodeEventsTimeline({ events }: any) {
  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 lg:col-span-3">
      <h2 className="text-xl font-semibold mb-4">Node Events Timeline</h2>

      <div className="space-y-4">
        {events.map((evt: any) => (
          <div key={evt.id} className="flex gap-4 items-start">
            <div
              className={`w-3 h-3 rounded-full mt-1 ${
                evt.type === "RESTART"
                  ? "bg-green-400"
                  : evt.type === "SYNC"
                  ? "bg-blue-400"
                  : evt.type === "UPGRADE"
                  ? "bg-purple-400"
                  : "bg-red-400"
              }`}
            />

            <div>
              <p className="text-neutral-200 font-semibold">
                {evt.type}: {evt.message}
              </p>
              <p className="text-neutral-400 text-sm">
                {new Date(evt.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}