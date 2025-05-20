import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { RewardRequestGateway } from '@rewardRequest/reward-request.gateway';

@Module({
  imports: [SharedModule],
  controllers: [RewardRequestGateway],
  providers: [],
  exports: [],
})
export class RewardRequestModule {}
