import { Body, Controller, Post } from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dtos/create-vault.dto';
import { DepositDto } from './dtos/deposit.dto';
import { WithdrawDto } from './dtos/withdraw.dto';

@Controller('vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Post('create')
  async create(@Body() dto: CreateVaultDto) {
    return this.vaultService.createVault(dto);
  }

  @Post('deposit')
  async deposit(@Body() dto: DepositDto) {
    return this.vaultService.deposit(dto);
  }

  @Post('withdraw')
  async withdraw(@Body() dto: WithdrawDto) {
    return this.vaultService.withdraw(dto);
  }
}