import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class DepositDto {
  @IsString()
  @IsNotEmpty()
  vaultId: string;

  @IsNumber()
  amount: number;
}