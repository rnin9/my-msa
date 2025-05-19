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

export class CreateEventDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(EventType, { each: true })
  @Prop({ required: true })
  eventType: Array<EventType>;

  @IsString()
  actantId: string;

  @IsOptional()
  @IsObject()
  condition?: Record<string, any>;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
