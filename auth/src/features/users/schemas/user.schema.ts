import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@shared/enum/role.enum';
import { IsEnum } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @IsEnum(Role, { each: true })
  @Prop({ required: true })
  roles: Array<Role>;
}

export const UserSchema = SchemaFactory.createForClass(User);
