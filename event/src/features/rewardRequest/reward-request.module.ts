import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { RewardRequestService } from '@rewardRequest/reward-request.service';
import { RewardRequestController } from '@rewardRequest/reward-request.controller';
import {
  RewardRequest,
  RewardRequestSchema,
} from '@rewardRequest/schemas/reward-request.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
  ],
  controllers: [RewardRequestController],
  providers: [RewardRequestService],
})
export class RewardModule {}
