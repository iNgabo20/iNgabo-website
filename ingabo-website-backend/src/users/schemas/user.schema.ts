import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../common/constants';
export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, trim: true, minlength: 2, maxlength: 80 }) firstName!: string;
  @Prop({ required: true, trim: true, minlength: 2, maxlength: 80 }) lastName!: string;
  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true }) email!: string;
  @Prop({ required: true, select: false }) password!: string;
  @Prop({ required: true, enum: Role, index: true }) role!: Role;
  @Prop() avatar?: string;
  @Prop({ default: true }) isActive!: boolean;
  @Prop() lastLogin?: Date;
  @Prop({ default: false, index: true }) isDeleted!: boolean;
  @Prop() deletedAt?: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
