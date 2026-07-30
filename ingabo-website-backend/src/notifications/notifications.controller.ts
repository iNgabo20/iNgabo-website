import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../common/constants';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';
@Controller('notifications') @UseGuards(AuthGuard('jwt'), RolesGuard) @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
export class NotificationsController { constructor(private readonly service: NotificationsService) {} @Get() findAll() { return this.service.findAll(); } @Post() @Roles(Role.ADMINISTRATOR) create(@Body() dto: CreateNotificationDto) { return this.service.create(dto); } @Patch(':id/read') markRead(@Param('id') id: string) { return this.service.markRead(id); } }
