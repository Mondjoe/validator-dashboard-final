import { Injectable } from '@nestjs/common';
import { NodeEventDTO } from './node-event.dto';

@Injectable()
export class NodeEventService {
  private events: NodeEventDTO[] = [
    {
      id: 'evt-1',
      type: 'RESTART',
      message: 'Node restarted successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: 'evt-2',
      type: 'SYNC',
      message: 'Node synced to latest head',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 'evt-3',
      type: 'UPGRADE',
      message: 'Client upgraded to v1.14.3',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
  ];

  getEvents(): NodeEventDTO[] {
    return this.events;
  }
}