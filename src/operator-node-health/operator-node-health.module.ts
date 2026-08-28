import { ValidatorScoreService } from './score/validator-score.service';
import { ValidatorScoreController } from './score/validator-score.controller';

@Module({
  controllers: [
    OperatorNodeHealthController,
    NodeEventController,
    RewardHistoryController,
    ValidatorDutyController,
    ValidatorScoreController
  ],
  providers: [
    OperatorNodeHealthService,
    HeartbeatService,
    NodeEventService,
    RewardHistoryService,
    ValidatorDutyService,
    ValidatorScoreService
  ],
  exports: [OperatorNodeHealthService]
})
export class OperatorNodeHealthModule {}