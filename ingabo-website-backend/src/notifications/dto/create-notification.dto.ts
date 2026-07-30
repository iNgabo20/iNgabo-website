import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { NotificationType } from '../../common/constants';
export class CreateNotificationDto { @IsString() @MinLength(2) @MaxLength(180) title!: string; @IsString() @MinLength(2) @MaxLength(2000) message!: string; @IsEnum(NotificationType) type!: NotificationType; }
