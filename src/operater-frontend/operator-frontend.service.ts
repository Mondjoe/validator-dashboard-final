import { Injectable } from '@nestjs/common';

import { WalletService } from '../wallet/wallet.service';
import { VaultService } from '../vault/vault.service';
import { DaoService } from '../dao/dao.service';
import { BadgeService } from '../badge/badge.service';
import { AuditService } from '../audit/audit.service';
import { UnifiedIngestionService } from '../unified-ingestion/unified-ingestion.service';

@Injectable()
export class OperatorFrontendService {
  constructor(
    private readonly wallet: WalletService,
    private readonly vault: VaultService,
    private readonly dao: DaoService,
    private readonly badge: BadgeService,
    private readonly audit: AuditService,
    private readonly ingestion: UnifiedIngestionService,
  ) {}

  async getOverview() {
    return {
      status: 'ok',
      overview: {
        modules: {
          wallet: 'active',
          vault: 'active',
          dao: 'active',
          badge: 'active',
          audit: 'active',
          ingestion: 'active',
        },
        auditLogs: await this.audit.getAll(),
      },
    };
  }

  async getAnalytics() {
    return {
      status: 'ok',
      analytics: {
        totalAuditLogs: (await this.audit.getAll()).logs.length,
        daoProposals: 'available',
        vaults: 'available',
        badges: 'available',
        ingestionStatus: 'ready',
      },
    };
  }
}