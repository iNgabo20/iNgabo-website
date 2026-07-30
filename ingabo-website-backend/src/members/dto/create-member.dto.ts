import { IsEmail, IsInt, IsOptional, IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';
export class CreateMemberDto {
  @IsString() @MaxLength(160) fullName!: string;
  @IsString() @MaxLength(120) role!: string;
  @IsOptional() @IsString() @MaxLength(1000) bio?: string;
  @IsOptional() @IsUrl() avatar?: string;
  @IsOptional() @IsUrl() linkedin?: string;
  @IsOptional() @IsUrl() github?: string;
  @IsEmail() email!: string;
  @IsOptional() @IsInt() @Min(0) @Max(10000) displayOrder?: number;
}
