import { Role } from '../constants';
export interface AuthUser {
  userId: string;
  email: string;
  role: Role;
}
