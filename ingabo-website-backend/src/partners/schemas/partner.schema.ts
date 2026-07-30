import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type PartnerDocument = HydratedDocument<Partner>;
@Schema({ timestamps: true, collection: 'partners' })
export class Partner {
  @Prop({ required: true, trim: true, maxlength: 120 }) name!: string;
  @Prop({ required: true }) logo!: string;
  @Prop({ required: true }) website!: string;
  @Prop({ maxlength: 500 }) description?: string;
  @Prop({ default: 0, index: true }) displayOrder!: number;
  @Prop({ default: false }) isDeleted!: boolean;
}
export const PartnerSchema = SchemaFactory.createForClass(Partner);
