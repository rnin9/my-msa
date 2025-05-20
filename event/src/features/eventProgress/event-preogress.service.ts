import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventProgress } from './schemas/event-progress.schema';
import { CreateEventProgressDto } from './dto/request/create-event-progress.dto';
import { UpdateEventProgressDto } from './dto/request/update-event-progress.dto';
import { Event } from '@events/schemas/event.schema';
import { EventProgressUpdater } from './utils/event-progress-updator';
import { EventConditionEvaluator } from './utils/event-progress-evaluator';

@Injectable()
export class EventProgressService {
  constructor(
    @InjectModel(EventProgress.name)
    private eventProgressModel: Model<EventProgress>,
    @InjectModel(Event.name)
    private eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventProgressDto): Promise<EventProgress> {
    const created = new this.eventProgressModel(createEventDto);

    return created.save();
  }

  async findAll(): Promise<EventProgress[]> {
    return this.eventProgressModel.find().exec();
  }

  async findOne(id: string): Promise<EventProgress> {
    const progressId = new Types.ObjectId(id);

    const event = await this.eventProgressModel.findById(progressId).exec();

    if (!event) throw new NotFoundException('Event not found');

    return event;
  }

  async update(
    id: string,
    updateEventProgressDto: UpdateEventProgressDto,
  ): Promise<EventProgress> {
    const progressId = new Types.ObjectId(id);

    const progressEntity = await this.eventProgressModel.findById(progressId);
    if (!progressEntity) throw new NotFoundException('EventProgress not found');

    const eventId = new Types.ObjectId(progressEntity.eventId);

    const eventEntity = await this.eventModel.findById(eventId);

    if (!eventEntity) throw new NotFoundException('Linked Event not found');

    const updatedProgress = updateEventProgressDto.progress
      ? EventProgressUpdater.update(
          eventEntity,
          progressEntity.progress,
          updateEventProgressDto.progress,
        )
      : progressEntity.progress;

    progressEntity.progress = updatedProgress;
    progressEntity.isCompleted = EventConditionEvaluator.isCompleted(
      progressEntity.progress,
      eventEntity.condition,
    );

    const saved = await progressEntity.save();

    return saved;
  }

  async remove(id: string): Promise<void> {
    const progressId = new Types.ObjectId(id);

    const result = await this.eventProgressModel
      .findByIdAndDelete(progressId)
      .exec();

    if (!result) throw new NotFoundException('Event not found');
  }
}
