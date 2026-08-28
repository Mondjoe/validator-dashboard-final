export class AlertsEngine {
  generateAlerts(metrics: any) {
    const alerts = [];

    if (metrics.system.cpu > 0.85) {
      alerts.push({
        id: 'cpu-high',
        severity: 'WARNING',
        message: 'CPU usage above 85%',
        startedAt: new Date().toISOString()
      });
    }

    if (metrics.network.peerCount < 10) {
      alerts.push({
        id: 'low-peers',
        severity: 'CRITICAL',
        message: 'Peer count critically low',
        startedAt: new Date().toISOString()
      });
    }

    return alerts;
  }
}