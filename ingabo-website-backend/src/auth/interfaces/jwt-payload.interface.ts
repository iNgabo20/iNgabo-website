import { Role } from '../../common/constants';

/**
 * Claims embedded in signed access tokens.
 * Kept separate from AuthUser so the strategy can validate and map cleanly.
 */
export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}
