import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { InternalGuard } from '@shared/internal/guards/internal.guard';
import { CreateUserDto } from '@users/dto/request/create-user.dto';
import { UserService } from '@users/user.service';

@UseGuards(InternalGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('/init')
  async initialize() {
    return await this.userService.initialize();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
