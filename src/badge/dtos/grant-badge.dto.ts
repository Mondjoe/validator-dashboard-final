import { IsString, IsNotEmpty } from 'class-validator';

export class GrantBadgeDto {
  @IsString()
  @IsNotEmpty()
  badgeId: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}