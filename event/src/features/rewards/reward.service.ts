import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reward } from '@rewards/schemas/reward.schema';
import { CreateRewardDto } from '@rewards/dto/request/create-reward.dto';
import { UpdateRewardDto } from '@rewards/dto/request/update-reward.dto';

@Injectable()
export class RewardService {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<Reward>) {}

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
