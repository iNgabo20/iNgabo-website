import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../common/constants';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  @Post('subscribe')
  subscribe(@Body() dto: SubscribeDto) {
    return this.service.subscribe(dto.email);
  }

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.service.create(dto);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Patch(':id/read')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  markRead(@Param('id') id: string) {
    return this.service.markRead(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  update(@Param('id') id: string, @Body() dto: UpdateMessageDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
