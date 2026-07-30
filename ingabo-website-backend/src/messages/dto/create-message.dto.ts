import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateMessageDto {
  @IsString() @MinLength(2) @MaxLength(120) name!: string;
  @IsEmail() email!: string;
  @IsOptional() @IsString() @MaxLength(40) phone?: string;
  @IsString() @MinLength(2) @MaxLength(180) subject!: string;
  @IsString() @MinLength(10) @MaxLength(5000) message!: string;
}
