import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '@events/event.service';
import { CreateEventDto } from '@events/dto/request/create-event.dto';
import { UpdateEventDto } from '@events/dto/request/update-event.dto';
import { CreateEventResponse } from '@events/dto/response/create-event-response.dto';
import { InternalGuard } from '@shared/internal/guards/internal.guard';

@UseGuards(InternalGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
  ): Promise<CreateEventResponse> {
    const event = await this.eventService.create(createEventDto);

    return { event };
  }

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
