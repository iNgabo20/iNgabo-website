import { IsArray, IsEnum, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { BlogStatus } from '../../common/constants';
export class CreateBlogDto {
  @IsString() @MinLength(3) @MaxLength(180) title!: string;
  @IsString() @MinLength(20) @MaxLength(500) summary!: string;
  @IsString() @MinLength(20) content!: string;
  @IsOptional() @IsUrl() coverImage?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional() @IsEnum(BlogStatus) status?: BlogStatus;
}
