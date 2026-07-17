export function AlertsPanel({ alerts }: any) {
  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-xl font-semibold mb-4">Alerts</h2>

      {alerts.length === 0 && (
        <p className="text-neutral-400">No active alerts.</p>
      )}

      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert: any) => (
            <div
              key={alert.id}
              className="p-4 rounded-lg bg-neutral-800 border border-neutral-700"
            >
              <p className="text-neutral-200 font-semibold">
                {alert.severity} — {alert.message}
              </p>
              <p className="text-neutral-400 text-sm">
                Started: {alert.startedAt}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}