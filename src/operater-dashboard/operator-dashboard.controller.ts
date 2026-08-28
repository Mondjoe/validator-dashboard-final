import { Controller, Get } from '@nestjs/common';
import { OperatorDashboardService } from './operator-dashboard.service';

@Controller('operator')
export class OperatorDashboardController {
  constructor(private readonly operatorService: OperatorDashboardService) {}

  @Get('summary')
  async getSummary() {
    return this.operatorService.getSummary();
  }
}