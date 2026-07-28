import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthUser } from '../common/interfaces/auth-user.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController { constructor(private readonly auth: AuthService) {} @Post('login') login(@Body() dto: LoginDto) { return this.auth.login(dto); } @Get('profile') @UseGuards(AuthGuard('jwt')) profile(@Req() req: Request & { user: AuthUser }) { return this.auth.profile(req.user); } }
