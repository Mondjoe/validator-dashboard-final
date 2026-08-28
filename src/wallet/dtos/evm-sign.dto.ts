import { IsString, IsNotEmpty } from 'class-validator';

export class EvmSignDto {
  @IsString()
  @IsNotEmpty()
  privateKey: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}