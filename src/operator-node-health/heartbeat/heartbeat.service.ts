export class HeartbeatService {
  private lastSeen = new Date().toISOString();

  beat() {
    this.lastSeen = new Date().toISOString();
  }

  getLastHeartbeat() {
    return this.lastSeen;
  }
}