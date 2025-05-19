import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@users/user.service';
import { SignInDto } from '@auth/dto/request/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@shared/enum/role.enum';
import { SignOutDto } from './dto/request/sign-out.dto';

interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  roles: Array<Role>;
}

@Injectable()
export class AuthService {
  private refreshTokensStore = new Map<string, string>();
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('emails not found emails');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: String(user._id),
      email: user.email,
      username: user.name,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  signOut(signOutDto: SignOutDto): boolean {
    const { userId } = signOutDto;

    for (const [token, uid] of this.refreshTokensStore.entries()) {
      if (uid === userId) {
        this.refreshTokensStore.delete(token);
      }
    }

    return true;
  }

  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
