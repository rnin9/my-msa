import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { RewardGateway } from '@rewards/reward.gateway';

@Module({
  imports: [SharedModule],
  controllers: [RewardGateway],
  providers: [],
  exports: [],
})
export class RewardModule {}
