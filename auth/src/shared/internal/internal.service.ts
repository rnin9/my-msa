// src/shared/internal/internal-auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class InternalService {
  private readonly kmsSecret = process.env.AUTH_INTERNAL_KMS;

  isValidKmsToken(token: string): boolean {
    return token === this.kmsSecret;
  }
}
