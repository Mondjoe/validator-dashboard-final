import { Module } from '@nestjs/common';

import { OperatorFrontendController } from './operator-frontend.controller';
import { OperatorFrontendService } from './operator-frontend.service';

import { WalletModule } from '../wallet/wallet.module';
import { VaultModule } from '../vault/vault.module';
import { DaoModule } from '../dao/dao.module';
import { BadgeModule } from '../badge/badge.module';
import { AuditModule } from '../audit/audit.module';
import { UnifiedIngestionModule } from '../unified-ingestion/unified-ingestion.module';

@Module({
  imports: [
    WalletModule,
    VaultModule,
    DaoModule,
    BadgeModule,
    AuditModule,
    UnifiedIngestionModule,
  ],
  controllers: [OperatorFrontendController],
  providers: [OperatorFrontendService],
})
export class OperatorFrontendModule {}