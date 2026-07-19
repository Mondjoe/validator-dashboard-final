export class ValidatorDutyDTO {
  id: string;
  slot: number;
  type: 'ATTESTATION' | 'PROPOSAL';
  status: 'SUCCESS' | 'MISSED';
  timestamp: string;
}