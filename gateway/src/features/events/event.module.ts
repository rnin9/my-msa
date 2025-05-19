import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { UserGateway } from '@users/user.gateway';

@Module({
  imports: [SharedModule],
  controllers: [UserGateway],
  providers: [],
  exports: [],
})
export class EventModule {}
