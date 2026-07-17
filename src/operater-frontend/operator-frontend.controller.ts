import { Controller, Get } from '@nestjs/common';
import { OperatorFrontendService } from './operator-frontend.service';

@Controller('dashboard')
export class OperatorFrontendController {
  constructor(private readonly service: OperatorFrontendService) {}

  @Get('overview')
  async getOverview() {
    return this.service.getOverview();
  }

  @Get('analytics')
  async getAnalytics() {
    return this.service.getAnalytics();
  }
}