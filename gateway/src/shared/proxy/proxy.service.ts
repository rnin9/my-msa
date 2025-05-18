import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SERVICE_MAP } from './constants/service-map';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(private readonly httpService: HttpService) {}

  async forwardRequest<T = any>(
    authorization: string,
    req: Request,
    domain: string,
  ): Promise<{ status: number; data: T }> {
    const baseUrl = SERVICE_MAP[domain];
    if (!baseUrl) {
      this.logger.error(`Invalid domain: ${domain}`);
      throw new InternalServerErrorException(
        `No target configured for domain: ${domain}`,
      );
    }

    const { method, originalUrl, headers, body, query } = req;
    const url = `${baseUrl}${originalUrl}`;

    const config: AxiosRequestConfig = {
      method: method.toLowerCase() as any,
      url,
      headers: {
        ...headers,
        Authorization: authorization,
      },
      params: query,
      data: body,
      validateStatus: () => true,
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
        error?.response?.data || error?.message,
      );
      throw new InternalServerErrorException('Gateway proxy failed');
    }
  }
}
