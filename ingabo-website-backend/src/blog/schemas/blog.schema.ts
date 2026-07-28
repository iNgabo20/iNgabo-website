import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { BlogStatus } from '../../common/constants';
export type BlogDocument = HydratedDocument<Blog>;
@Schema({ timestamps: true, collection: 'blogs' })
export class Blog {
  @Prop({ required: true, trim: true, maxlength: 180 }) title!: string;
  @Prop({ required: true, unique: true, lowercase: true, index: true }) slug!: string;
  @Prop({ required: true, maxlength: 500 }) summary!: string;
  @Prop({ required: true }) content!: string;
  @Prop() coverImage?: string;
  @Prop({ type: [String], default: [], index: true }) tags!: string[];
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true }) author!: Types.ObjectId;
  @Prop({ enum: BlogStatus, default: BlogStatus.DRAFT, index: true }) status!: BlogStatus;
  @Prop() publishedAt?: Date;
  @Prop({ default: false, index: true }) isDeleted!: boolean;
  @Prop() deletedAt?: Date;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
