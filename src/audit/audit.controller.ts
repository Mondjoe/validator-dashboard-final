import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateLogDto } from './dtos/create-log.dto';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('log')
  async log(@Body() dto: CreateLogDto) {
    return this.auditService.log(dto);
  }

  @Get('all')
  async getAll() {
    return this.auditService.getAll();
  }
}