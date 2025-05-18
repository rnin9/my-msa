// src/features/users/dto/create-user.dto.ts

import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/shared/enum/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role;
}
