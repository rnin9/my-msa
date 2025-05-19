import { RewardType } from '@shared/enum/reward.enum';
import {
  IsMongoId,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateRewardDto {
  @IsMongoId()
  eventId: Types.ObjectId;

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
