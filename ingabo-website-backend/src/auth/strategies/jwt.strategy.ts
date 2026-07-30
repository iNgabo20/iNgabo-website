import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUser } from '../../common/interfaces/auth-user.interface';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * Validates Bearer JWTs and re-checks that the subject user is still active.
 * Tokens for deleted or deactivated accounts are rejected immediately.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly users: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('jwtSecret'),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    const userId = payload.sub;
    if (!userId || !payload.email || !payload.role) {
      throw new UnauthorizedException('Invalid access token');
    }

    const user = await this.users.findActiveById(userId);
    if (!user) {
      throw new UnauthorizedException(
        'Account is inactive, deleted, or no longer exists',
      );
    }

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
