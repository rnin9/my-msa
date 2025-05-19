import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { EventGateway } from '@events/event.gateway';

@Module({
  imports: [SharedModule],
  controllers: [EventGateway],
  providers: [],
  exports: [],
})
export class EventModule {}
