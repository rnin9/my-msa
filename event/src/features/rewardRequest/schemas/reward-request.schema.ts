import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class RewardRequest extends Document {
  @Prop({ ref: 'Event', required: true })
  eventId: string;

  @Prop({ ref: 'Reward', required: true })
  rewardId: string;

  @Prop({ ref: 'User', required: true })
  userId: string;

  @Prop({ default: true })
  rewardEnabled: boolean;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
