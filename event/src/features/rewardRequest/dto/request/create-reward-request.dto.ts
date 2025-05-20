import { IsBoolean, IsString } from 'class-validator';

export class CreateRewardRequestDto {
  @IsString()
  eventId: string;

  @IsString()
  rewardId: string;

  @IsString()
  userId: string;

  @IsBoolean()
  rewardEnabled: boolean;
}
