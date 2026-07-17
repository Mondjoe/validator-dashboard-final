import { IsString, IsNotEmpty } from 'class-validator';

export class RevokeBadgeDto {
  @IsString()
  @IsNotEmpty()
  badgeId: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}