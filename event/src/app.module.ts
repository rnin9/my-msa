import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventModule } from '@events/event.module';
import { SharedModule } from '@shared/shared.module';
import { RewardModule } from '@rewards/reward.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    EventModule,
    SharedModule,
    RewardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
