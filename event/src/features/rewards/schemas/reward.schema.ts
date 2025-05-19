import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardType } from '@shared/enum/reward.enum';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Reward {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true, enum: RewardType })
  rewardType: RewardType;

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: Object, default: {} })
  payload: Record<string, any>;

  @Prop({ type: Object })
  condition?: Record<string, any>;

  @Prop({ default: true })
  isEnabled: boolean;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
