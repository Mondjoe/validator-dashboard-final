import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVaultDto {
  @IsString()
  @IsNotEmpty()
  vaultId: string;

  @IsString()
  @IsNotEmpty()
  owner: string;
}