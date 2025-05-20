import { PartialType } from '@nestjs/mapped-types';
import { CreateRewardRequestDto } from '@rewardRequest/dto/request/create-reward-request.dto';

export class UpdateRewardRequestDto extends PartialType(
  CreateRewardRequestDto,
) {}
