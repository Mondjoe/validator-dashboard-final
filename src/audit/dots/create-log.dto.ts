import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  actor: string;

  @IsOptional()
  details: any;
}