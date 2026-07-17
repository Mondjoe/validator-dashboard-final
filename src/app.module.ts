import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UnifiedIngestionModule } from './unified-ingestion/unified-ingestion.module'; // if you create one

@Module({
  imports: [AuthModule, UnifiedIngestionModule],
})
export class AppModule {}