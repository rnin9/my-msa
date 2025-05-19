import { RewardType } from '@shared/enum/reward.enum';
import {
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';

export class CreateRewardDto {
  @IsString()
  eventId: string;

  @IsEnum(RewardType)
  rewardType: RewardType;

  @IsNumber()
  quantity: number;

  @IsOptional()
  payload?: Record<string, any>;

  @IsOptional()
  condition?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
