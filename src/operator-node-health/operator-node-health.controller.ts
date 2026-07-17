import { Controller, Get } from '@nestjs/common';
import { OperatorNodeHealthService } from './operator-node-health.service';

@Controller('operator/node-health')
export class OperatorNodeHealthController {
  constructor(private readonly service: OperatorNodeHealthService) {}

  @Get()
  async getNodeHealth() {
    return this.service.getHealth();
  }
}