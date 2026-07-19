import { Controller, Get } from '@nestjs/common';
import { NodeEventService } from './node-event.service';

@Controller('operator/node-events')
export class NodeEventController {
  constructor(private readonly service: NodeEventService) {}

  @Get()
  getEvents() {
    return this.service.getEvents();
  }
}