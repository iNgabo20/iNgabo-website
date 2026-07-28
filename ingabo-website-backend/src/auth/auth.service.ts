import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService, private readonly jwt: JwtService) {}
  async login(dto: LoginDto) { const user = await this.users.findByEmail(dto.email); if (!user || !user.isActive || !(await bcrypt.compare(dto.password, user.password))) throw new UnauthorizedException('Invalid email or password'); await this.users.markLogin(user.id); return { accessToken: this.jwt.sign({ userId: user.id, email: user.email, role: user.role }), user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } }; }
  profile(user: { userId: string }) { return this.users.findOne(user.userId); }
}
