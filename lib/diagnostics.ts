export function diagnose(input: any) {
  const issues = [];
  let severity = 0;

  // CPU
  if (input.cpu > 0.85) {
    issues.push("High CPU usage");
    severity += 2;
  }

  // RAM
  if (input.ram < 0.15) {
    issues.push("Low available RAM");
    severity += 2;
  }

  // Disk
  if (input.disk > 0.85) {
    issues.push("Disk almost full");
    severity += 3;
  }

  // RPC
  if (input.rpcFail) {
    issues.push("RPC unreachable");
    severity += 3;
  }

  // Sync drift
  if (input.lag > 5) {
    issues.push("Node is falling behind");
    severity += 3;
  }

  // Alerts
  if (input.alerts?.length > 0) {
    issues.push(...input.alerts);
    severity += input.alerts.length;
  }

  // Severity scale
  let level = "normal";
  if (severity >= 8) level = "critical";
  else if (severity >= 4) level = "warning";

  // Recommendations
  const recommendations = [];

  if (issues.includes("High CPU usage")) {
    recommendations.push("Check validator load or reduce parallel tasks");
  }

  if (issues.includes("Low available RAM")) {
    recommendations.push("Restart node or increase memory allocation");
  }

  if (issues.includes("Disk almost full")) {
    recommendations.push("Prune old logs or expand disk capacity");
  }

  if (issues.includes("RPC unreachable")) {
    recommendations.push("Switch to backup RPC or restart RPC service");
  }

  if (issues.includes("Node is falling behind")) {
    recommendations.push("Check network latency or peer connectivity");
  }

  return {
    level,
    issues,
    recommendations
  };
}