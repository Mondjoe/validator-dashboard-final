import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ConnectWalletDto } from './dtos/connect-wallet.dto';
import { EvmSignDto } from './dtos/evm-sign.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('connect')
  async connect(@Body() dto: ConnectWalletDto) {
    return this.walletService.connect(dto);
  }

  @Post('evm/sign')
  async signEvm(@Body() dto: EvmSignDto) {
    return this.walletService.signEvm(dto);
  }

  @Post('evm/balance')
  async evmBalance(@Body() dto: ConnectWalletDto) {
    return this.walletService.getEvmBalance(dto.address);
  }
}