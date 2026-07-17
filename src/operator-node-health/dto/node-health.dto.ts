export class NodeHealthDTO {
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  lastHeartbeat: string;

  system: {
    cpu: number;
    ram: number;
    disk: number;
  };

  network: {
    latencyMs: number;
    inMbps: number;
    outMbps: number;
    peerCount: number;
    headLag: number;
  };

  validator: {
    index: number;
    participationRate: number;
    missedAttestations24h: number;
    proposals24h: number;
    rewardsDay: number;
  };

  client: {
    execution: { name: string; version: string };
    consensus: { name: string; version: string };
  };

  alerts: Array<{
    id: string;
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    message: string;
    startedAt: string;
  }>;
}