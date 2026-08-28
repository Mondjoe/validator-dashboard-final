import { Injectable } from '@nestjs/common';
import { CreateBadgeDto } from './dtos/create-badge.dto';
import { GrantBadgeDto } from './dtos/grant-badge.dto';
import { RevokeBadgeDto } from './dtos/revoke-badge.dto';

@Injectable()
export class BadgeService {
  private badges = new Map<
    string,
    {
      name: string;
      description: string;
      holders: Set<string>;
    }
  >();

  async createBadge(dto: CreateBadgeDto) {
    if (this.badges.has(dto.badgeId)) {
      return { status: 'error', message: 'Badge already exists' };
    }

    this.badges.set(dto.badgeId, {
      name: dto.name,
      description: dto.description,
      holders: new Set(),
    });

    return {
      status: 'created',
      badgeId: dto.badgeId,
      name: dto.name,
    };
  }

  async grantBadge(dto: GrantBadgeDto) {
    const badge = this.badges.get(dto.badgeId);
    if (!badge) {
      return { status: 'error', message: 'Badge not found' };
    }

    badge.holders.add(dto.address);

    return {
      status: 'granted',
      badgeId: dto.badgeId,
      address: dto.address,
    };
  }

  async revokeBadge(dto: RevokeBadgeDto) {
    const badge = this.badges.get(dto.badgeId);
    if (!badge) {
      return { status: 'error', message: 'Badge not found' };
    }

    badge.holders.delete(dto.address);

    return {
      status: 'revoked',
      badgeId: dto.badgeId,
      address: dto.address,
    };
  }
}