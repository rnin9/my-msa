import {
  Controller,
  UseGuards,
  Req,
  Get,
  Post,
  BadRequestException,
  Delete,
  Patch,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@shared/enum/role.enum';
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
  create(@Req() req: Request) {
    return this.proxyService.forwardRequest(this.kms, req, 'user');
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'user');
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'user');
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'user');
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'user');
  }
}
