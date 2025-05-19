import { Module } from '@nestjs/common';
import { EventService } from '@events/events.service';
import { EventController } from '@events/events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
