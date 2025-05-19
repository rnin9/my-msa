import { EventProgressPayload } from '@eventProgress/dto/eventProgress.dto';
import { IsBoolean, IsObject, IsOptional } from 'class-validator';
import { IsMongoId } from 'class-validator';

export class CreateEventProgressDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  eventId: string;

  @IsObject()
  progress: EventProgressPayload;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsBoolean()
  @IsOptional()
  rewardClaimed?: boolean;
}
