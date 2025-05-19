import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventProgress } from './schemas/event-progress.schema';
import { CreateEventProgressDto } from './dto/request/create-event-progress.dto';
import { UpdateEventProgressDto } from './dto/request/update-event-progress.dto';
import { EventType } from '@shared/enum/event.enum';
import { Event } from '@events/schemas/event.schema';
import {
  AttendanceProgress,
  CouponProgress,
  EventProgressPayload,
  ReferralProgress,
  SpecialProgress,
} from '@eventProgress/dto/eventProgress.dto';

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
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const event = await this.eventProgressModel.findById(id).exec();

    if (!event) throw new NotFoundException('Event not found');

    return event;
  }

  async update(
    id: string,
    updateEventProgressDto: UpdateEventProgressDto,
  ): Promise<EventProgress> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');

    const progressEntity = await this.eventProgressModel.findById(id);
    if (!progressEntity) throw new NotFoundException('EventProgress not found');

    const event = await this.eventModel.findById(progressEntity.eventId);
    if (!event) throw new NotFoundException('Linked Event not found');

    const updatedProgress = updateEventProgressDto.progress
      ? this.processProgressUpdate(
          event,
          progressEntity.progress,
          updateEventProgressDto.progress,
        )
      : progressEntity.progress;

    progressEntity.progress = updatedProgress;

    const saved = await progressEntity.save();

    return saved;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const result = await this.eventProgressModel.findByIdAndDelete(id).exec();

    if (!result) throw new NotFoundException('Event not found');
  }

  private processProgressUpdate(
    event: Event,
    currentProgress: EventProgressPayload,
    incomingProgress: EventProgressPayload,
  ): EventProgressPayload {
    switch (event.type) {
      case EventType.Attendance: {
        const progress: AttendanceProgress = {
          ...currentProgress,
        } as AttendanceProgress;

        const date: string =
          'date' in incomingProgress &&
          typeof incomingProgress.date === 'string'
            ? incomingProgress.date
            : '';

        if (date) {
          const dates = progress.attendanceDates || [];
          if (!dates.includes(date)) {
            dates.push(date);
            dates.sort();

            progress.attendanceDates = dates;
            progress.consecutiveDays = this.calculateConsecutiveDays(dates);
          }
        }
        return progress;
      }

      case EventType.Referral: {
        const progress: ReferralProgress = {
          ...currentProgress,
        } as ReferralProgress;

        progress.referralCount = (progress.referralCount || 0) + 1;
        return progress;
      }
      case EventType.Coupon: {
        const progress: CouponProgress = {
          ...currentProgress,
        } as CouponProgress;

        const code =
          'couponCode' in incomingProgress && incomingProgress?.couponCode;

        if (code) {
          progress.couponCode = code;
          progress.isUsed = true;
        }
        return progress;
      }

      case EventType.Special: {
        const progress: SpecialProgress = {
          ...currentProgress,
        } as SpecialProgress;

        progress.achieved = true;

        return progress;
      }
      default:
        throw new BadRequestException('Unsupported event type');
    }
  }

  private calculateConsecutiveDays(dates: string[]): number {
    if (dates.length === 0) return 0;

    // 날짜 정렬
    const sorted = dates
      .map((date) => new Date(date))
      .sort((a, b) => a.getTime() - b.getTime());

    let count = 1;
    for (let i = 1; i < sorted.length; i++) {
      const diff =
        (sorted[i].getTime() - sorted[i - 1].getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        count++;
      } else if (diff > 1) {
        count = 1;
      }
    }

    return count;
  }
}
