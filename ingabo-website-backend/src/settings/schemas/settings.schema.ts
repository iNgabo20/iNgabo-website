import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type SettingsDocument = HydratedDocument<Settings>;
@Schema({ timestamps: true, collection: 'settings' })
export class Settings {
  @Prop() siteTitle?: string;
  @Prop() siteDescription?: string;
  @Prop() logo?: string;
  @Prop() favicon?: string;
  @Prop() contactEmail?: string;
  @Prop() contactPhone?: string;
  @Prop() address?: string;
  @Prop() facebook?: string;
  @Prop() twitter?: string;
  @Prop() linkedin?: string;
  @Prop() github?: string;
  @Prop() youtube?: string;
  @Prop() footerText?: string;
  @Prop({ type: [String], default: [] }) seoKeywords!: string[];
}
export const SettingsSchema = SchemaFactory.createForClass(Settings);
