import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { SignInDto } from '@auth/dto/request/sign-in.dto';
import { AuthRequest } from '@shared/interface/auth-request.interface';
import { AuthUser } from '@shared/interface/auth-user.interface';
import { SignInResponseDto } from '@auth/dto/response/sign-in-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('my')
  getMyInfo(@Req() req: AuthRequest): AuthUser {
    return req.user;
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut(@Req() req: AuthRequest): void {
    const userId = req.user['id'];

    this.authService.signOut(userId);
  }

  @Post('verify-token')
  verifyToken(@Body('token') token: string): boolean {
    return this.authService.verifyToken(token);
  }

  // TODO: refresh 작업
  // @Post('refresh')
  // @UseGuards(JwtAuthGuard)
  // async refresh(
  //   @Body('refreshToken') refreshToken: string,
  // ): Promise<{ accessToken: string; refreshToken: string }> {
  //   return this.authService.refreshTokens(refreshToken);
  // }
}
