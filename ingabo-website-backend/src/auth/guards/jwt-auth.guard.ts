import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Passport JWT authentication guard.
 * Prefer this over AuthGuard('jwt') for consistent imports across modules.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
