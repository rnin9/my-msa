import {
  Controller,
  UseGuards,
  Req,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard)
  @Get('my')
  getMyInfo(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'auth');
  }

  @Post('sign-in')
  async signIn(@Req() req: Request) {
    return this.proxyService.forwardRequest(this.kms, req, 'auth');
  }

  @UseGuards(AuthGuard)
  @Post('sign-out')
  async signOut(@Req() req: AuthRequest): Promise<void> {
    await this.proxyService.forwardRequest(this.kms, req, 'auth');
  }

  @UseGuards(AuthGuard)
  @Post('verify-token')
  async verifyToken(@Req() req: AuthRequest) {
    return this.proxyService.forwardRequest(this.kms, req, 'auth');
  }
}
