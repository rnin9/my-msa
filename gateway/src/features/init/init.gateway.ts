import { Controller, Req, Post, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthRequest } from '@shared/interface/auth-request.interface';
import { ProxyService } from '@shared/proxy/proxy.service';

@Controller('init')
export class InitGateway {
  private readonly authKms: string;
  private readonly eventKms: string;

  constructor(
    private readonly configService: ConfigService,
    private proxyService: ProxyService,
  ) {
    const authKms = this.configService.get<string>('AUTH_INTERNAL_KMS');
    const eventKms = this.configService.get<string>('EVENT_INTERNAL_KMS');

    if (!authKms || !eventKms) {
      throw new BadRequestException('INTERNAL_KMS 설정이 누락되었습니다.');
    }

    this.authKms = authKms;
    this.eventKms = eventKms;
  }

  @Post()
  async initialize(@Req() req: AuthRequest) {
    const originUrl = req.originalUrl;
    req.originalUrl = `/users${originUrl}`;
    await this.proxyService.forwardRequest(this.authKms, req, 'users');

    req.originalUrl = `/events${originUrl}`;
    const initEvents = await this.proxyService.forwardRequest(
      this.eventKms,
      req,
      'events',
    );

    req.originalUrl = `/rewards${originUrl}`;
    req.body = {
      ...req.body,
      eventIds: initEvents.data?.map((data) => String(data._id)),
    };

    await this.proxyService.forwardRequest(this.eventKms, req, 'rewards');
  }
}
