import { Request } from 'express';
import { AuthUser } from '@shared/interface/auth-user.interface';

export interface AuthRequest extends Request {
  user: AuthUser;
}
