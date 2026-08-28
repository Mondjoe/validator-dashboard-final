import { Injectable } from '@nestjs/common';
import { RewardHistoryDTO } from './reward-history.dto';

@Injectable()
export class RewardHistoryService {
  private history: RewardHistoryDTO[] = [
    { day: '2026-07-13', amount: 0.012 },
    { day: '2026-07-14', amount: 0.018 },
    { day: '2026-07-15', amount: 0.009 },
    { day: '2026-07-16', amount: 0.021 },
    { day: '2026-07-17', amount: 0.015 },
    { day: '2026-07-18', amount: 0.017 },
    { day: '2026-07-19', amount: 0.022 },
  ];

  getHistory(): RewardHistoryDTO[] {
    return this.history;
  }

  ingest(amount: number) {
    const today = new Date().toISOString().split('T')[0];
    this.history.push({ day: today, amount });

    if (this.history.length > 7) {
      this.history.shift();
    }
  }
}