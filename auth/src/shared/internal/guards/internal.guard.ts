import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { InternalService } from '@shared/internal/internal.service';

@Injectable()
export class InternalGuard implements CanActivate {
  constructor(private readonly internalAuthService: InternalService) {}

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers['x-internal-kms'];

    if (typeof token !== 'string') {
      throw new InternalServerErrorException('Missing internal KMS header');
    }

    if (!this.internalAuthService.isValidKmsToken(token)) {
      throw new InternalServerErrorException('Invalid internal KMS token');
    }

    return true;
  }
}
