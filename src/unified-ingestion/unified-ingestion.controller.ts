import { 
  Body, 
  Controller, 
  Post 
} from '@nestjs/common';

import { UnifiedIngestionService } from './unified-ingestion.service';

import { CsvIngestDto } from './dtos/csv-ingest.dto';
import { ChainIngestDto } from './dtos/chain-ingest.dto';
import { UnifiedIngestDto } from './dtos/unified-ingest.dto';

@Controller('unified-ingestion')
export class UnifiedIngestionController {
  constructor(
    private readonly ingestionService: UnifiedIngestionService,
  ) {}

  // -----------------------------
  // CSV INGESTION
  // -----------------------------
  @Post('csv/validators')
  async ingestCsvValidators(@Body() dto: CsvIngestDto) {
    return this.ingestionService.ingestCsvValidators(dto.path);
  }

  @Post('csv/rewards')
  async ingestCsvRewards(@Body() dto: CsvIngestDto) {
    return this.ingestionService.ingestCsvRewards(dto.path);
  }

  // -----------------------------
  // CHAIN INGESTION
  // -----------------------------
  @Post('chain/validators')
  async ingestChainValidators(@Body() dto: ChainIngestDto) {
    return this.ingestionService.ingestChainValidators(dto.chain);
  }

  @Post('chain/rewards')
  async ingestChainRewards(@Body() dto: ChainIngestDto) {
    return this.ingestionService.ingestChainRewards(dto.chain);
  }

  // -----------------------------
  // UNIFIED INGESTION PIPELINE
  // -----------------------------
  @Post('pipeline/run')
  async runUnifiedPipeline(@Body() dto: UnifiedIngestDto) {
    return this.ingestionService.runUnifiedPipeline(dto);
  }
}