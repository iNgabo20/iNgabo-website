import { BadRequestException, Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { mkdirSync, unlink } from 'node:fs';
import { ConfigService } from '@nestjs/config';
import { Role } from '../common/constants'; import { Roles } from '../common/decorators/roles.decorator'; import { RolesGuard } from '../common/guards/roles.guard';
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
@Controller('uploads') @UseGuards(AuthGuard('jwt'), RolesGuard) @Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
export class UploadsController {
  private readonly directory: string;
  constructor(config: ConfigService) { this.directory = config.get<string>('uploadDirectory', './uploads'); mkdirSync(this.directory, { recursive: true }); }
  @Post('images') @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 }, storage: diskStorage({ destination: './uploads', filename: (_req, file, cb) => cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`) }), fileFilter: (_req, file, cb) => cb(null, allowedTypes.has(file.mimetype)) })) upload(@UploadedFile() file?: Express.Multer.File) { if (!file) throw new BadRequestException('A valid image file is required'); return { id: file.filename, filename: file.filename, mimeType: file.mimetype, size: file.size }; }
  @Delete(':id') remove(@Param('id') id: string) { if (id.includes('/') || id.includes('\\') || id.includes('..')) throw new BadRequestException('Invalid upload identifier'); unlink(join(this.directory, id), (error) => { if (error && error.code !== 'ENOENT') throw error; }); return { deleted: true }; }
}
