import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { EventType } from '@shared/enum/event.enum';
import { Prop } from '@nestjs/mongoose';
import { EventCondition } from '../event.dto';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(EventType)
  @Prop({ required: true })
  type: EventType;

  @IsString()
  actantId: string;

  @IsOptional()
  @IsObject()
  condition: EventCondition;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
