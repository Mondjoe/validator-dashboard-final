import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class WithdrawDto {
  @IsString()
  @IsNotEmpty()
  vaultId: string;

  @IsNumber()
  amount: number;
}