import {
  Controller,
  UseGuards,
  Req,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { AuthRequest } from '@shared/interface/auth-request.interface';
import { ProxyService } from '@shared/proxy/proxy.service';
import { Request } from 'express';

@Controller('auth')
export class AuthGateway {
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

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  getMyInfo(@Req() req: AuthRequest) {
    return req.user;
  }

  @Post('/sign-in')
  async signIn(@Req() req: Request) {
    return this.proxyService.forwardRequest(this.kms, req, 'auth');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/sign-out')
  async signOut(@Req() req: AuthRequest) {
    req.body = {
      ...req.body,
      userId: req.user.id,
    };

    return this.proxyService.forwardRequest(this.kms, req, 'auth');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/verify-token')
  async verifyToken(@Req() req: AuthRequest) {
    if (!req.headers['authorization']) {
      throw new BadRequestException('bearer token이  누락되었습니다.');
    }

    req.body = {
      ...req.body,
      token: req.headers['authorization'].replace(/^Bearer\s+/i, ''),
    };

    return this.proxyService.forwardRequest(this.kms, req, 'auth');
  }
}
