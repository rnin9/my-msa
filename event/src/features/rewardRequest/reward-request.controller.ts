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
import { CreateRewardRequestDto } from '@rewardRequest/dto/request/create-reward-request.dto';
import { UpdateRewardRequestDto } from '@rewardRequest/dto/request/update-reward-request.dto';
import { RewardRequestService } from '@rewardRequest/reward-request.service';
import { InternalGuard } from '@shared/internal/guards/internal.guard';
import { CreateRewardRequestResponse } from '@rewardRequest/dto/response/create-reward-response.dto';

@UseGuards(InternalGuard)
@Controller('rewardRequest')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @Post()
  async create(
    @Body() createRewardRequestDto: CreateRewardRequestDto,
  ): Promise<CreateRewardRequestResponse> {
    const request = await this.rewardRequestService.create(
      createRewardRequestDto,
    );

    return { request };
  }

  @Get()
  async findAll() {
    return this.rewardRequestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rewardRequestService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRewardRequestDto: UpdateRewardRequestDto,
  ) {
    return this.rewardRequestService.update(id, updateRewardRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rewardRequestService.remove(id);
  }
}
