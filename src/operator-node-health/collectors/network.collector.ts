export class NetworkCollector {
  async getMetrics() {
    return {
      latencyMs: 42,
      inMbps: 12.3,
      outMbps: 8.7,
      peerCount: 54,
      headLag: 0
    };
  }
}