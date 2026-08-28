import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
  @IsNotEmpty()
  badgeId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}