import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { SignInDto } from '@auth/dto/request/sign-in.dto';
import { AuthRequest } from '@shared/interface/auth-request.interface';
import { SignInResponseDto } from '@auth/dto/response/sign-in-response.dto';
import { InternalGuard } from '@shared/internal/guards/internal.guard';
import { MyResponseDto } from './dto/response/my-response.dto';
import { SignOutDto } from './dto/request/sign-out.dto';

@UseGuards(InternalGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/my')
  getMyInfo(@Req() req: AuthRequest): MyResponseDto {
    return { user: req.user };
  }

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @Post('/sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut(@Body() signOutDto: SignOutDto): void {
    this.authService.signOut(signOutDto);
  }

  @Post('/verify-token')
  verifyToken(@Body('token') token: string): boolean {
    return this.authService.verifyToken(token);
  }

  // TODO: refresh 작업
  // @Post('refresh')
  // @UseGuards(AuthGuard)
  // async refresh(
  //   @Body('refreshToken') refreshToken: string,
  // ): Promise<{ accessToken: string; refreshToken: string }> {
  //   return this.authService.refreshTokens(refreshToken);
  // }
}
