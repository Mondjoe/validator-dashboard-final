import { IsString, IsNotEmpty } from 'class-validator';

export class CsvIngestDto {
  @IsString()
  @IsNotEmpty()
  path: string;
}