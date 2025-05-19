import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalService {
  private readonly kms: string;

  constructor(private readonly configService: ConfigService) {
    const kms = this.configService.get<string>('AUTH_INTERNAL_KMS');

    if (!kms) {
      throw new BadRequestException(
        'EVENT_INTERNAL_KMS 설정이 누락되었습니다.',
      );
    }

    this.kms = kms;
  }

  isValidKmsToken(token: string): boolean {
    return token === this.kms;
  }
}
