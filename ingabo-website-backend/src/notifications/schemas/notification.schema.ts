import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NotificationType } from '../../common/constants';
export type NotificationDocument = HydratedDocument<Notification>;
@Schema({ timestamps: true, collection: 'notifications' })
export class Notification {
  @Prop({ required: true, maxlength: 180 }) title!: string;
  @Prop({ required: true, maxlength: 2000 }) message!: string;
  @Prop({ required: true, enum: NotificationType, index: true })
  type!: NotificationType;
  @Prop({ default: false, index: true }) isRead!: boolean;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
