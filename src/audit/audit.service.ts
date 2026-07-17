import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dtos/create-log.dto';

@Injectable()
export class AuditService {
  private logs: Array<{
    timestamp: number;
    action: string;
    actor: string;
    details: any;
  }> = [];

  async log(dto: CreateLogDto) {
    const entry = {
      timestamp: Date.now(),
      action: dto.action,
      actor: dto.actor,
      details: dto.details,
    };

    this.logs.push(entry);

    return {
      status: 'logged',
      entry,
    };
  }

  async getAll() {
    return {
      status: 'ok',
      logs: this.logs,
    };
  }
}