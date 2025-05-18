import { Controller, Req, Post, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from '@shared/proxy/proxy.service';
import { Request } from 'express';

@Controller('events')
export class EventGateway {
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

  @Post()
  create(@Req() req: Request) {
    return this.proxyService.forwardRequest(this.kms, req, 'user');
  }
}
