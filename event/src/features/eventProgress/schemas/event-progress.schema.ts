import { EventProgressPayload } from '@eventProgress/dto/eventProgress.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventProgressDocument = EventProgress & Document;

@Schema({ timestamps: true })
export class EventProgress {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  progress: EventProgressPayload;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: false })
  rewardClaimed: boolean;
}

export const EventProgressSchema = SchemaFactory.createForClass(EventProgress);
