import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { EventProgressGateway } from '@eventProgress/event-progress.gateway';

@Module({
  imports: [SharedModule],
  controllers: [EventProgressGateway],
  providers: [],
  exports: [],
})
export class EventProgressModule {}
