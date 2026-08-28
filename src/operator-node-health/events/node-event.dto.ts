export class NodeEventDTO {
  id: string;
  type: 'RESTART' | 'SYNC' | 'UPGRADE' | 'ALERT';
  message: string;
  timestamp: string;
}