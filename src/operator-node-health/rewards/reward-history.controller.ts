import { Controller, Get } from '@nestjs/common';
import { RewardHistoryService } from './reward-history.service';

@Controller('operator/rewards-history')
export class RewardHistoryController {
  constructor(private readonly service: RewardHistoryService) {}

  @Get()
  getHistory() {
    return this.service.getHistory();
  }
}