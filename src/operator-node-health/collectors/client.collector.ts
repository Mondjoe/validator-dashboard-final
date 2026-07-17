export class ClientCollector {
  async getVersions() {
    return {
      execution: { name: 'geth', version: '1.14.3' },
      consensus: { name: 'prysm', version: '5.0.1' }
    };
  }
}