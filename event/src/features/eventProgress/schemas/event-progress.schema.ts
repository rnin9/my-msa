import { EventProgressPayload } from '@eventProgress/dto/eventProgress.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventProgressDocument = EventProgress & Document;

@Schema({ timestamps: true })
export class EventProgress {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true, ref: 'Event' })
  eventId: string;

  @Prop({ type: Object, default: {} })
  progress: EventProgressPayload;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: false })
  rewardClaimed: boolean;
}

export const EventProgressSchema = SchemaFactory.createForClass(EventProgress);
