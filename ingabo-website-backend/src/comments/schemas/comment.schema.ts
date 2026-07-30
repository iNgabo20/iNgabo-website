import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true, collection: 'comments' })
export class Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Blog', index: true }) blog?: Types.ObjectId;
  @Prop({ required: true, trim: true, maxlength: 120 }) name!: string;
  @Prop({ required: true, lowercase: true, trim: true }) email!: string;
  @Prop({ required: true, maxlength: 2000 }) message!: string;
  @Prop({ default: false, index: true }) approved!: boolean;
  @Prop({ default: false }) isDeleted!: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
