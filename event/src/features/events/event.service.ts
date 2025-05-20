import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '@events/dto/event.dto';
import { CreateEventDto } from '@events/dto/request/create-event.dto';
import { UpdateEventDto } from '@events/dto/request/update-event.dto';
import { EventType } from '@shared/enum/event.enum';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async initialize(): Promise<Array<Event>> {
    const createEvents: CreateEventDto[] = [
      {
        name: '연속 출석 이벤트',
        description: '연속 출석일 수를 채워야 하는 이벤트입니다.',
        type: EventType.Attendance,
        actantId: 'system',
        condition: {
          eventType: EventType.Attendance,
          conditionType: 'consecutive',
          requiredDays: 5,
        },
        startDate: '2025-06-01T00:00:00.000Z',
        endDate: '2025-06-30T23:59:59.999Z',
        isEnabled: true,
      },
      {
        name: '추천인 이벤트',
        description: '추천 인원 수를 충족해야 하는 이벤트입니다.',
        type: EventType.Referral,
        actantId: 'system',
        condition: {
          eventType: EventType.Referral,
          requiredReferrals: 3,
        },
        startDate: '2025-06-10T00:00:00.000Z',
        isEnabled: true,
      },
      {
        name: '쿠폰 등록 이벤트',
        description: '특정 쿠폰 코드를 입력해야 하는 이벤트입니다.',
        type: EventType.Coupon,
        actantId: 'system',
        condition: {
          eventType: EventType.Coupon,
          requiredCouponCode: 'DISCOUNT2025',
        },
        startDate: '2025-05-20T00:00:00.000Z',
        endDate: '2025-07-31T23:59:59.999Z',
        isEnabled: true,
      },
      {
        name: '특별 이벤트',
        description: '조건 없는 특별 이벤트입니다.',
        type: EventType.Special,
        actantId: 'system',
        condition: {
          eventType: EventType.Special,
        },
        startDate: '2025-05-01T00:00:00.000Z',
        isEnabled: true,
      },
    ];

    const events = await Promise.all(
      createEvents.map((event) => this.create(event)),
    );

    return events;
  }

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
