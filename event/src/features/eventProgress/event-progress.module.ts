import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import {
  EventProgress,
  EventProgressSchema,
} from '@eventProgress/schemas/event-progress.schema';
import { EventProgressController } from '@eventProgress/event-progress.controller';
import { EventProgressService } from '@eventProgress/event-preogress.service';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: EventProgress.name, schema: EventProgressSchema },
    ]),
  ],
  controllers: [EventProgressController],
  providers: [EventProgressService],
})
export class EventProgressModule {}
