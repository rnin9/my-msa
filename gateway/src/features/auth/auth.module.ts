import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { AuthGateway } from '@auth/auth.gateway';

@Module({
  imports: [SharedModule],
  controllers: [AuthGateway],
  providers: [],
  exports: [],
})
export class AuthModule {}
