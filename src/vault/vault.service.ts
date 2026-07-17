import { Injectable } from '@nestjs/common';
import { CreateVaultDto } from './dtos/create-vault.dto';
import { DepositDto } from './dtos/deposit.dto';
import { WithdrawDto } from './dtos/withdraw.dto';

@Injectable()
export class VaultService {
  private vaults = new Map<string, { owner: string; balance: number }>();

  async createVault(dto: CreateVaultDto) {
    if (this.vaults.has(dto.vaultId)) {
      return { status: 'error', message: 'Vault already exists' };
    }

    this.vaults.set(dto.vaultId, { owner: dto.owner, balance: 0 });

    return { status: 'created', vaultId: dto.vaultId, owner: dto.owner };
  }

  async deposit(dto: DepositDto) {
    const vault = this.vaults.get(dto.vaultId);
    if (!vault) {
      return { status: 'error', message: 'Vault not found' };
    }

    vault.balance += dto.amount;

    return { status: 'deposited', vaultId: dto.vaultId, balance: vault.balance };
  }

  async withdraw(dto: WithdrawDto) {
    const vault = this.vaults.get(dto.vaultId);
    if (!vault) {
      return { status: 'error', message: 'Vault not found' };
    }

    if (vault.balance < dto.amount) {
      return { status: 'error', message: 'Insufficient balance' };
    }

    vault.balance -= dto.amount;

    return { status: 'withdrawn', vaultId: dto.vaultId, balance: vault.balance };
  }
}