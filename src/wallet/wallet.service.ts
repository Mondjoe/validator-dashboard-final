import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConnectWalletDto } from './dtos/connect-wallet.dto';
import { EvmSignDto } from './dtos/evm-sign.dto';

@Injectable()
export class WalletService {
  private evmProvider = new ethers.JsonRpcProvider(
    process.env.EVM_RPC || 'https://rpc.ankr.com/eth'
  );

  async connect(dto: ConnectWalletDto) {
    return {
      status: 'connected',
      chain: dto.chain,
      address: dto.address,
    };
  }

  async signEvm(dto: EvmSignDto) {
    const wallet = new ethers.Wallet(dto.privateKey);
    const signature = await wallet.signMessage(dto.message);

    return {
      status: 'signed',
      signature,
    };
  }

  async getEvmBalance(address: string) {
    const balance = await this.evmProvider.getBalance(address);
    return {
      status: 'ok',
      balance: ethers.formatEther(balance),
    };
  }
}