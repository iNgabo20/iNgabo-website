import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
export class UpdateSettingsDto {
  @IsOptional() @IsString() @MaxLength(180) siteTitle?: string;
  @IsOptional() @IsString() @MaxLength(1000) siteDescription?: string;
  @IsOptional() @IsUrl() logo?: string;
  @IsOptional() @IsUrl() favicon?: string;
  @IsOptional() @IsEmail() contactEmail?: string;
  @IsOptional() @IsString() contactPhone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsUrl() facebook?: string;
  @IsOptional() @IsUrl() twitter?: string;
  @IsOptional() @IsUrl() linkedin?: string;
  @IsOptional() @IsUrl() github?: string;
  @IsOptional() @IsUrl() youtube?: string;
  @IsOptional() @IsString() @MaxLength(500) footerText?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) seoKeywords?: string[];
}
