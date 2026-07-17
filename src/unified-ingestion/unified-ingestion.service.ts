import { Injectable } from '@nestjs/common';
import { UnifiedIngestDto } from './dtos/unified-ingest.dto';

@Injectable()
export class UnifiedIngestionService {

  // ------------------------------------
  // CSV INGESTION
  // ------------------------------------
  async ingestCsvValidators(path: string) {
    return {
      status: 'ok',
      type: 'csv_validators',
      message: `CSV validators ingested from: ${path}`,
    };
  }

  async ingestCsvRewards(path: string) {
    return {
      status: 'ok',
      type: 'csv_rewards',
      message: `CSV rewards ingested from: ${path}`,
    };
  }

  // ------------------------------------
  // CHAIN INGESTION
  // ------------------------------------
  async ingestChainValidators(chain: string) {
    return {
      status: 'ok',
      type: 'chain_validators',
      message: `Chain validators ingested from: ${chain}`,
    };
  }

  async ingestChainRewards(chain: string) {
    return {
      status: 'ok',
      type: 'chain_rewards',
      message: `Chain rewards ingested from: ${chain}`,
    };
  }

  // ------------------------------------
  // UNIFIED PIPELINE
  // ------------------------------------
  async runUnifiedPipeline(dto: UnifiedIngestDto) {
    const results: any[] = [];

    // CSV
    if (dto.runCsv && dto.csvPath) {
      results.push(await this.ingestCsvValidators(dto.csvPath));
      results.push(await this.ingestCsvRewards(dto.csvPath));
    }

    // CHAIN
    if (dto.runChain && dto.chain) {
      results.push(await this.ingestChainValidators(dto.chain));
      results.push(await this.ingestChainRewards(dto.chain));
    }

    // Validators only
    if (dto.runValidators) {
      if (dto.csvPath) {
        results.push(await this.ingestCsvValidators(dto.csvPath));
      }
      if (dto.chain) {
        results.push(await this.ingestChainValidators(dto.chain));
      }
    }

    // Rewards only
    if (dto.runRewards) {
      if (dto.csvPath) {
        results.push(await this.ingestCsvRewards(dto.csvPath));
      }
      if (dto.chain) {
        results.push(await this.ingestChainRewards(dto.chain));
      }
    }

    return {
      status: 'pipeline_completed',
      steps: results,
    };
  }
}