import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class ConnectWalletDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsIn(['evm', 'solana', 'tron', 'ton'])
  chain: string;
}