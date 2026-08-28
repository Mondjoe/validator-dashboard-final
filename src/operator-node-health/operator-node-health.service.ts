import { Injectable } from '@nestjs/common';
import { NodeHealthDTO } from './dto/node-health.dto';
import { SystemCollector } from './collectors/system.collector';
import { NetworkCollector } from './collectors/network.collector';
import { ValidatorCollector } from './collectors/validator.collector';
import { ClientCollector } from './collectors/client.collector';
import { AlertsEngine } from './alerts/alerts.engine';
import { HeartbeatService } from './heartbeat/heartbeat.service';

@Injectable()
export class OperatorNodeHealthService {
  constructor(
    private readonly heartbeat: HeartbeatService
  ) {}

  private system = new SystemCollector();
  private network = new NetworkCollector();
  private validator = new ValidatorCollector();
  private client = new ClientCollector();
  private alertsEngine = new AlertsEngine();

  async getHealth(): Promise<NodeHealthDTO> {
    this.heartbeat.beat();

    const system = this.system.getMetrics();
    const network = await this.network.getMetrics();
    const validator = await this.validator.getMetrics();
    const client = await this.client.getVersions();

    const alerts = this.alertsEngine.generateAlerts({ system, network });

    const status =
      alerts.some(a => a.severity === 'CRITICAL')
        ? 'DOWN'
        : alerts.some(a => a.severity === 'WARNING')
        ? 'DEGRADED'
        : 'HEALTHY';

    return {
      status,
      lastHeartbeat: this.heartbeat.getLastHeartbeat(),
      system,
      network,
      validator,
      client,
      alerts
    };
  }
}