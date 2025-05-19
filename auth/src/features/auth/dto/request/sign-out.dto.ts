import { IsString, IsOptional } from 'class-validator';

export class SignOutDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
