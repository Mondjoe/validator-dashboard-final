import { ValidatorDutyService } from './duties/validator-duty.service';
import { ValidatorDutyController } from './duties/validator-duty.controller';

@Module({
  controllers: [
    OperatorNodeHealthController,
    NodeEventController,
    RewardHistoryController,
    ValidatorDutyController
  ],
  providers: [
    OperatorNodeHealthService,
    HeartbeatService,
    NodeEventService,
    RewardHistoryService,
    ValidatorDutyService
  ],
  exports: [OperatorNodeHealthService]
})
export class OperatorNodeHealthModule {}