import {
  Injectable,
  Logger,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async forwardRequest<T = any>(
    authorization: string,
    req: Request,
    domain: string,
  ): Promise<{ status: number; data: T }> {
    const SERVICE_MAP: Record<string, string> = {
      auth: this.configService.get('AUTH_BE_URL') || 'AUTH',
      users: this.configService.get('AUTH_BE_URL') || 'AUTH',
      events: this.configService.get('EVENT_BE_URL') || 'EVENT',
      rewards: this.configService.get('EVENT_BE_URL') || 'EVENT',
      eventProgress: this.configService.get('EVENT_BE_URL') || 'EVENT',
      rewardRequest: this.configService.get('EVENT_BE_URL') || 'EVENT',
    };

    const baseUrl = SERVICE_MAP[`${domain}`];

    if (!baseUrl) {
      this.logger.error(`Invalid domain: ${domain}`);
      throw new InternalServerErrorException(
        `No target configured for domain: ${domain}`,
      );
    }

    const { method, originalUrl, query, body } = req;

    const url = `${baseUrl}${originalUrl}`;

    const config: AxiosRequestConfig = {
      method: method.toLowerCase() as any,
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      params: query ? query : undefined,
      data: body ? body : undefined,
    };

    try {
      const response: AxiosResponse<T> = await lastValueFrom(
        this.httpService.request<T>(config),
      );

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      this.logger.error(
        `Proxy error to ${url}`,
        error?.response?.data,
        error?.message,
      );

      if (error.response) {
        // Axios HTTP 에러 응답 처리
        const status = error.response.status;
        const data = error.response.data;

        throw new HttpException(data, status);
      } else {
        throw new InternalServerErrorException('Gateway proxy failed', error);
      }
    }
  }
}
