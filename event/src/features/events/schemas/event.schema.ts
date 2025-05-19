import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EventType } from '@shared/enum/event.enum';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    enum: EventType,
    default: EventType,
  })
  type: EventType;

  @Prop({ required: true })
  actantId: string;

  @Prop({ required: true, type: Object })
  condition: Record<string, any>;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: false })
  endDate?: Date;

  @Prop({ default: true })
  isEnabled: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
