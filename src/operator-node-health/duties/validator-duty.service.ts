import { Injectable } from '@nestjs/common';
import { ValidatorDutyDTO } from './validator-duty.dto';

@Injectable()
export class ValidatorDutyService {
  private duties: ValidatorDutyDTO[] = [
    {
      id: 'duty-1',
      slot: 123456,
      type: 'ATTESTATION',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: 'duty-2',
      slot: 123457,
      type: 'PROPOSAL',
      status: 'MISSED',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'duty-3',
      slot: 123458,
      type: 'ATTESTATION',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
  ];

  getDuties(): ValidatorDutyDTO[] {
    return this.duties;
  }
}