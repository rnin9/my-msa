import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RewardService } from '@rewards/reward.service';
import { CreateRewardDto } from './dto/request/create-reward.dto';
import { UpdateRewardDto } from './dto/request/update-reward.dto';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('/init')
  initialize(@Body() body: { eventIds: Array<string> }) {
    return this.rewardService.initialize(body.eventIds);
  }

  @Post()
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardService.create(createRewardDto);
  }

  @Get()
  findAll() {
    return this.rewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardService.update(id, updateRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardService.remove(id);
  }
}
