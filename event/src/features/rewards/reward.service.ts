import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reward } from '@rewards/schemas/reward.schema';
import { CreateRewardDto } from '@rewards/dto/request/create-reward.dto';
import { UpdateRewardDto } from '@rewards/dto/request/update-reward.dto';
import { RewardType } from '@shared/enum/reward.enum';

@Injectable()
export class RewardService {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<Reward>) {}

  async initialize(eventIds: Array<string>): Promise<Array<Reward>> {
    const rewardExamples: Omit<CreateRewardDto, 'eventId'>[] = [
      {
        rewardType: RewardType.Cash,
        quantity: 5000, // 5,000원 현금
        payload: { currency: 'KRW' },
        condition: { minPurchaseAmount: 20000 },
        isEnabled: true,
      },
      {
        rewardType: RewardType.Point,
        quantity: 1000, // 1,000포인트 적립
        payload: { pointCategory: 'loyalty' },
        condition: { minEventProgress: 70 },
        isEnabled: true,
      },
      {
        rewardType: RewardType.Gifticon,
        quantity: 1, // 기프티콘 1개
        payload: { gifticonProvider: 'Starbucks', gifticonCode: 'ABC123XYZ' },
        condition: { validUsersOnly: true },
        isEnabled: true,
      },
      {
        rewardType: RewardType.Cash,
        quantity: 10000, // 10,000원 현금
        payload: { currency: 'KRW', bonus: true },
        condition: { referralCount: 5 },
        isEnabled: false, // 비활성화된 리워드 예시
      },
      {
        rewardType: RewardType.Point,
        quantity: 500, // 500포인트
        payload: { pointCategory: 'promo' },
        isEnabled: true,
      },
    ];

    const createRewardDtos: CreateRewardDto[] = [];

    for (let i = 0; i < eventIds.length; i++) {
      const eventId = eventIds[i];
      const example = rewardExamples[i % rewardExamples.length];

      createRewardDtos.push({
        eventId,
        rewardType: example.rewardType,
        quantity: example.quantity,
        payload: example.payload,
        condition: example.condition,
        isEnabled: example.isEnabled,
      });
    }

    const rewards = await Promise.all(
      createRewardDtos.map((dto) => this.create(dto)),
    );

    return rewards;
  }

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const created = new this.rewardModel(createRewardDto);

    return created.save();
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().exec();
  }

  async findOne(id: string): Promise<Reward> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const reward = await this.rewardModel.findById(id).exec();

    if (!reward) throw new NotFoundException('Reward not found');

    return reward;
  }

  async update(id: string, updateRewardDto: UpdateRewardDto): Promise<Reward> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const updated = await this.rewardModel
      .findByIdAndUpdate(id, updateRewardDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Reward not found');

    return updated;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const result = await this.rewardModel.findByIdAndDelete(id).exec();

    if (!result) throw new NotFoundException('Reward not found');
  }
}
