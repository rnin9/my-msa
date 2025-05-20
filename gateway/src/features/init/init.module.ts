import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { InitGateway } from './init.gateway';

@Module({
  imports: [SharedModule],
  controllers: [InitGateway],
  providers: [],
  exports: [],
})
export class InitModule {}
