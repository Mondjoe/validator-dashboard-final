import * as os from 'os';

export class SystemCollector {
  getMetrics() {
    const cpuLoad = os.loadavg()[0] / os.cpus().length;
    const ramUsage = 1 - os.freemem() / os.totalmem();

    return {
      cpu: Number(cpuLoad.toFixed(2)),
      ram: Number(ramUsage.toFixed(2)),
      disk: 0.55 // placeholder (Termux environment)
    };
  }
}