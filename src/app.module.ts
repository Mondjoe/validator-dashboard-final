import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { VaultModule } from './vault/vault.module';
import { DaoModule } from './dao/dao.module';
import { UnifiedIngestionModule } from './unified-ingestion/unified-ingestion.module';

@Module({
  imports: [
    AuthModule,
    WalletModule,
    VaultModule,
    DaoModule,
    UnifiedIngestionModule,
  ],
})
export class AppModule {}