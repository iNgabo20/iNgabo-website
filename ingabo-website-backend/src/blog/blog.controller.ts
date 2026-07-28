import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common'; import { AuthGuard } from '@nestjs/passport'; import { Request } from 'express'; import { BlogStatus, Role } from '../common/constants'; import { Roles } from '../common/decorators/roles.decorator'; import { RolesGuard } from '../common/guards/roles.guard'; import { AuthUser } from '../common/interfaces/auth-user.interface'; import { BlogQueryDto } from './dto/blog-query.dto'; import { CreateBlogDto } from './dto/create-blog.dto'; import { UpdateBlogDto } from './dto/update-blog.dto'; import { BlogService } from './blog.service';
@Controller('blogs') export class BlogController {
  constructor(private readonly service: BlogService) { }
  @Get() findAll(@Query() query: BlogQueryDto) { return this.service.findAll(query); }
  @Get(':slug') findOne(@Param('slug') slug: string) { return this.service.findBySlug(slug); }
  @Post() @UseGuards(AuthGuard('jwt'), RolesGuard) @Roles(Role.ADMINISTRATOR, Role.MAINTAINER) create(@Body() dto: CreateBlogDto, @Req() req: Request & { user: AuthUser }) { return this.service.create(dto, req.user.userId); }
  @Patch(':id') @UseGuards(AuthGuard('jwt'), RolesGuard) @Roles(Role.ADMINISTRATOR, Role.MAINTAINER) update(@Param('id') id: string, @Body() dto: UpdateBlogDto) { return this.service.update(id, dto); }
  @Patch(':id/publish') @UseGuards(AuthGuard('jwt'), RolesGuard) @Roles(Role.ADMINISTRATOR) publish(@Param('id') id: string) { return this.service.setStatus(id, BlogStatus.PUBLISHED); }
  @Patch(':id/unpublish') @UseGuards(AuthGuard('jwt'), RolesGuard) @Roles(Role.ADMINISTRATOR) unpublish(@Param('id') id: string) { return this.service.setStatus(id, BlogStatus.DRAFT); }
  @Get('manage/all') @UseGuards(AuthGuard('jwt'), RolesGuard) @Roles(Role.ADMINISTRATOR, Role.MAINTAINER) findAllForManagement(@Query() query: BlogQueryDto) { return this.service.findAll(query, true); }
  @Delete(':id') @UseGuards(AuthGuard('jwt'), RolesGuard) @Roles(Role.ADMINISTRATOR, Role.MAINTAINER) remove(@Param('id') id: string) { return this.service.remove(id); }
}
