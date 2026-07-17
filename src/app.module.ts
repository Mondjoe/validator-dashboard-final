import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { VaultModule } from './vault/vault.module';
import { DaoModule } from './dao/dao.module';
import { BadgeModule } from './badge/badge.module';
import { UnifiedIngestionModule } from './unified-ingestion/unified-ingestion.module';
import { AuditModule } from './audit/audit.module';
import { OperatorDashboardModule } from './operator-dashboard/
import { OperatorFrontendModule } from './operator-frontend/operator-frontend.module';

@Module({
  imports: [
    AuthModule,
    WalletModule,
    VaultModule,
    DaoModule,
    BadgeModule,
    UnifiedIngestionModule,
    AuditModule,
    Operator Dashboard,
    OperatorFrontendModule,
  ],
})
export class AppModule {}