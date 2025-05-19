import {
  Controller,
  Req,
  Post,
  BadRequestException,
  Body,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@shared/enum/role.enum';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RolesGuard } from '@shared/guards/roles.guard';
import { AuthRequest } from '@shared/interface/auth-request.interface';
import { ProxyService } from '@shared/proxy/proxy.service';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('eventProgress')
export class EventProgressGateway {
  private readonly kms: string;

  constructor(
    private readonly configService: ConfigService,
    private proxyService: ProxyService,
  ) {
    const kms = this.configService.get<string>('EVENT_INTERNAL_KMS');

    if (!kms) {
      throw new BadRequestException(
        'EVENT_INTERNAL_KMS 설정이 누락되었습니다.',
      );
    }

    this.kms = kms;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Operator)
  @Post()
  async create(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'eventProgress');
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.proxyService.forwardRequest(this.kms, req, 'eventProgress');
  }

  @Get(':id')
  async findOne(@Req() req: Request) {
    return this.proxyService.forwardRequest(this.kms, req, 'eventProgress');
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Operator)
  @Patch(':id')
  async update(@Req() req: AuthRequest) {
    req.body = {
      ...req.body,
      actantId: req.user.id,
    };

    return this.proxyService.forwardRequest(this.kms, req, 'eventProgress');
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Operator)
  @Delete(':id')
  async remove(@Req() req: AuthRequest) {
    req.body = {
      ...req.body,
      actantId: req.user.id,
    };

    return this.proxyService.forwardRequest(this.kms, req, 'eventProgress');
  }
}
