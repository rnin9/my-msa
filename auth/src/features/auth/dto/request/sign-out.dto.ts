import { IsString, IsOptional } from 'class-validator';

export class SignOutDto {
  @IsString()
  @IsOptional()
  refreshToken?: string;
}
