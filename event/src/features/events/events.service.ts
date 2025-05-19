import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from '@events/dto/request/create-event.dto';
import { UpdateEventDto } from '@events/dto/request/update-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const created = new this.eventModel(createEventDto);

    return created.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const event = await this.eventModel.findById(id).exec();

    if (!event) throw new NotFoundException('Event not found');

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const updated = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Event not found');

    return updated;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const result = await this.eventModel.findByIdAndDelete(id).exec();

    if (!result) throw new NotFoundException('Event not found');
  }
}
