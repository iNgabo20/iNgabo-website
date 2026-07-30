import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../common/constants';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}
  @Post() create(@Body() dto: CreateCommentDto) {
    return this.service.create(dto);
  }
  @Get() findAll(@Query('blog') blog?: string) {
    return this.service.findAll(blog);
  }
  @Get('manage/all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  findAllForManagement(@Query('blog') blog?: string) {
    return this.service.findAll(blog, true);
  }
  @Patch(':id/approve')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  approve(@Param('id') id: string) {
    return this.service.setApproval(id, true);
  }
  @Patch(':id/reject')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  reject(@Param('id') id: string) {
    return this.service.setApproval(id, false);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
