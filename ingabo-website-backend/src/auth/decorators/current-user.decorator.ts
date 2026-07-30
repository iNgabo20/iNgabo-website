import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from '../../common/interfaces/auth-user.interface';

type AuthenticatedRequest = Request & { user?: AuthUser };

/**
 * Extracts the authenticated user attached by JwtStrategy / JwtAuthGuard.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user as AuthUser;
  },
);
