import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from '@users/dto/request/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      return await createdUser.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException(
          '해당 이메일로 가입된 사용자가 이미 존재합니다.',
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      console.error({ error });

      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(
    id: string,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User | null> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    const isSamePassword = updateUserDto.password
      ? await bcrypt.compare(updateUserDto.password, existingUser.password)
      : true;

    const isSame =
      (updateUserDto.name ?? existingUser.name) === existingUser.name &&
      (updateUserDto.email ?? existingUser.email) === existingUser.email &&
      (updateUserDto.roles ?? existingUser.roles) === existingUser.roles &&
      isSamePassword;

    if (isSame) {
      throw new BadRequestException('변경된 정보가 없습니다.');
    }

    if (updateUserDto.password && !isSamePassword) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
