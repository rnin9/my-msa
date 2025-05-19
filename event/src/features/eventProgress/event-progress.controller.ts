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
import { InternalGuard } from '@shared/internal/guards/internal.guard';
import { CreateEventProgressResponse } from '@eventProgress/dto/response/create-event-response.dto';
import { CreateEventProgressDto } from '@eventProgress/dto/request/create-event-progress.dto';
import { EventProgressService } from '@eventProgress/event-preogress.service';
import { UpdateEventProgressDto } from '@eventProgress/dto/request/update-event-progress.dto';

@UseGuards(InternalGuard)
@Controller('eventProgress')
export class EventProgressController {
  constructor(private readonly eventProgressService: EventProgressService) {}

  @Post()
  async create(
    @Body() createEventDto: CreateEventProgressDto,
  ): Promise<CreateEventProgressResponse> {
    const eventProgress =
      await this.eventProgressService.create(createEventDto);

    return { eventProgress };
  }

  @Get()
  async findAll() {
    return this.eventProgressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventProgressService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventProgressDto: UpdateEventProgressDto,
  ) {
    return this.eventProgressService.update(id, updateEventProgressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventProgressService.remove(id);
  }
}
