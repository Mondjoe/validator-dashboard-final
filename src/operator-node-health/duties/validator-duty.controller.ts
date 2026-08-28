import { Controller, Get } from '@nestjs/common';
import { ValidatorDutyService } from './validator-duty.service';

@Controller('operator/validator-duties')
export class ValidatorDutyController {
  constructor(private readonly service: ValidatorDutyService) {}

  @Get()
  getDuties() {
    return this.service.getDuties();
  }
}