import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RewardRequest } from './schemas/reward-request.schema';
import { CreateRewardRequestDto } from '@rewardRequest/dto/request/create-reward-request.dto';
import { UpdateRewardRequestDto } from '@rewardRequest//dto/request/update-reward-request.dto';

@Injectable()
export class RewardRequestService {
  constructor(
    @InjectModel(RewardRequest.name)
    private rewardRequestModel: Model<RewardRequest>,
  ) {}

  async create(
    createRewardRequestDto: CreateRewardRequestDto,
  ): Promise<RewardRequest> {
    const created = new this.rewardRequestModel(createRewardRequestDto);

    return created.save();
  }

  async findAll(): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find().exec();
  }

  async findOne(id: string): Promise<RewardRequest> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const reward = await this.rewardRequestModel.findById(id).exec();

    if (!reward) throw new NotFoundException('Reward not found');

    return reward;
  }

  async update(
    id: string,
    updateRewardRequestDto: UpdateRewardRequestDto,
  ): Promise<RewardRequest> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const updated = await this.rewardRequestModel
      .findByIdAndUpdate(id, updateRewardRequestDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Reward not found');

    return updated;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const result = await this.rewardRequestModel.findByIdAndDelete(id).exec();

    if (!result) throw new NotFoundException('Reward not found');
  }
}
