import {
  Controller,
  UseGuards,
  Req,
  Get,
  Post,
  BadRequestException,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@shared/enum/role.enum';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RolesGuard } from '@shared/guards/roles.guard';
import { AuthRequest } from '@shared/interface/auth-request.interface';
import { ProxyService } from '@shared/proxy/proxy.service';
import { Request } from 'express';

@Controller('users')
export class UserGateway {
  private readonly kms: string;

  constructor(
    private readonly configService: ConfigService,
    private proxyService: ProxyService,
  ) {
    const kms = this.configService.get<string>('AUTH_INTERNAL_KMS');

    if (!kms) {
      throw new BadRequestException('AUTH_INTERNAL_KMS 설정이 누락되었습니다.');
    }

    this.kms = kms;
  }

  @Post()
  async create(@Req() req: Request) {
    return this.proxyService.forwardRequest(this.kms, req, 'users');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'users');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  async findOne(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'users');
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'users');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async remove(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'users');
  }
}
