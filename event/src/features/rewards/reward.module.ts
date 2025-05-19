import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { Reward, RewardSchema } from '@rewards/schemas/reward.schema';
import { RewardService } from '@rewards/reward.service';
import { RewardsController } from '@rewards/reward.controller';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
  ],
  controllers: [RewardsController],
  providers: [RewardService],
})
export class RewardModule {}
