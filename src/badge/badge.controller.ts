import { Body, Controller, Post } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dtos/create-badge.dto';
import { GrantBadgeDto } from './dtos/grant-badge.dto';
import { RevokeBadgeDto } from './dtos/revoke-badge.dto';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post('create')
  async create(@Body() dto: CreateBadgeDto) {
    return this.badgeService.createBadge(dto);
  }

  @Post('grant')
  async grant(@Body() dto: GrantBadgeDto) {
    return this.badgeService.grantBadge(dto);
  }

  @Post('revoke')
  async revoke(@Body() dto: RevokeBadgeDto) {
    return this.badgeService.revokeBadge(dto);
  }
}