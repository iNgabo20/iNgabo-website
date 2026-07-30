import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type MessageDocument = HydratedDocument<Message>;
@Schema({ timestamps: true, collection: 'messages' })
export class Message {
  @Prop({ required: true, trim: true, maxlength: 120 }) name!: string;
  @Prop({ required: true, lowercase: true, trim: true, index: true }) email!: string;
  @Prop({ maxlength: 40 }) phone?: string;
  @Prop({ required: true, maxlength: 180 }) subject!: string;
  @Prop({ required: true, maxlength: 5000 }) message!: string;
  @Prop({ default: false, index: true }) isRead!: boolean;
  @Prop({ default: false }) isDeleted!: boolean;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
