import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class ChainIngestDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['ethereum', 'bsc', 'polygon', 'arbitrum', 'base', 'solana'])
  chain: string;
}