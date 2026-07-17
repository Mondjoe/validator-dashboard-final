import { Module } from '@nestjs/common';
import { OperatorNodeHealthController } from './operator-node-health.controller';
import { OperatorNodeHealthService } from './operator-node-health.service';
import { HeartbeatService } from './heartbeat/heartbeat.service';

@Module({
  controllers: [OperatorNodeHealthController],
  providers: [OperatorNodeHealthService, HeartbeatService],
  exports: [OperatorNodeHealthService]
})
export class OperatorNodeHealthModule {}