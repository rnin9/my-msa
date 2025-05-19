import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@users/user.module';
import { AuthModule } from '@auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { EventModule } from '@events/event.module';
import { RewardModule } from '@rewards/reward.module';
import { EventProgressModule } from '@eventProgress/event-progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    UserModule,
    AuthModule,
    EventModule,
    RewardModule,
    EventProgressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
