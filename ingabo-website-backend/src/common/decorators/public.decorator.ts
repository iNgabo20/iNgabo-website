import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route as publicly accessible when a global JwtAuthGuard is enabled.
 * Currently informational for route documentation; auth routes remain unguarded
 * unless a controller-level guard is applied.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
