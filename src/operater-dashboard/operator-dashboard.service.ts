import { Injectable } from '@nestjs/common';

import { WalletService } from '../wallet/wallet.service';
import { VaultService } from '../vault/vault.service';
import { DaoService } from '../dao/dao.service';
import { BadgeService } from '../badge/badge.service';
import { AuditService } from '../audit/audit.service';
import { UnifiedIngestionService } from '../unified-ingestion/unified-ingestion.service';

@Injectable()
export class OperatorDashboardService {
  constructor(
    private readonly walletService: WalletService,
    private readonly vaultService: VaultService,
    private readonly daoService: DaoService,
    private readonly badgeService: BadgeService,
    private readonly auditService: AuditService,
    private readonly ingestionService: UnifiedIngestionService,
  ) {}

  async getSummary() {
    return {
      status: 'ok',
      dashboard: {
        wallets: 'connected via wallet module',
        vaults: 'managed via vault module',
        dao: 'proposals + votes available',
        badges: 'badge engine active',
        auditLogs: this.auditService.getAll(),
        ingestion: 'CSV + chain ingestion ready',
      },
    };
  }
}