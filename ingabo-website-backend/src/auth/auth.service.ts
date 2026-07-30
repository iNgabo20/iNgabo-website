import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { AuthUser } from '../common/interfaces/auth-user.interface';
import { MailService } from '../mail/mail.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

const OTP_BCRYPT_ROUNDS = 10;
const OTP_EXPIRY_MINUTES = 15;
const MAX_OTP_ATTEMPTS = 5;

/**
 * Precomputed bcrypt hash used only so failed logins for unknown emails
 * still pay a compare cost (mitigates email-enumeration timing attacks).
 * Value is bcrypt('invalid-password-placeholder', 10).
 */
const DUMMY_PASSWORD_HASH =
  '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQbPvJqKqKqKqKqKqKqKqKqKqKqKqK';

export interface AuthLoginResult {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export interface AuthMessageResult {
  message: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtExpiresIn: string;

  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
    config: ConfigService,
  ) {
    this.jwtExpiresIn = config.get<string>('jwtExpiresIn', '1h');
  }

  /**
   * Authenticate an administrator or maintainer and issue a JWT access token.
   */
  async login(dto: LoginDto): Promise<AuthLoginResult> {
    const user = await this.users.findByEmailForAuth(dto.email);

    // Always compare against a hash so timing is similar for missing users.
    const passwordHash = user?.password ?? DUMMY_PASSWORD_HASH;
    let passwordValid = false;
    try {
      passwordValid = await bcrypt.compare(dto.password, passwordHash);
    } catch {
      passwordValid = false;
    }

    if (!user || !user.isActive || !passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.users.markLogin(user.id);
    this.logger.log(`Successful login for user ${user.id} (${user.role})`);

    return this.buildLoginResult(user);
  }

  /**
   * Return the public profile of the currently authenticated user.
   */
  profile(user: AuthUser): Promise<Partial<User>> {
    return this.users.findOne(user.userId);
  }

  /**
   * Start password reset: email a one-time code when the account exists.
   * Always returns the same message to prevent email enumeration.
   */
  async forgotPassword(dto: ForgotPasswordDto): Promise<AuthMessageResult> {
    const generic: AuthMessageResult = {
      message:
        'If an account exists for that email, a password reset code has been sent.',
    };

    const user = await this.users.findByEmailForAuth(dto.email);
    if (!user || !user.isActive) {
      return generic;
    }

    const otp = this.generateOtp();
    const otpHash = await bcrypt.hash(otp, OTP_BCRYPT_ROUNDS);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await this.users.setPasswordResetOtp(user.id, otpHash, expiresAt);

    const delivered = await this.mail.sendPasswordResetOtp({
      to: user.email,
      firstName: user.firstName,
      otp,
      expiresInMinutes: OTP_EXPIRY_MINUTES,
    });

    if (!delivered) {
      this.logger.warn(
        `Password reset OTP generated for user ${user.id} but email delivery failed or is disabled`,
      );
    } else {
      this.logger.log(`Password reset OTP emailed for user ${user.id}`);
    }

    return generic;
  }

  /**
   * Verify the emailed OTP and set a new password.
   */
  async resetPassword(dto: ResetPasswordDto): Promise<AuthMessageResult> {
    const user = await this.users.findByEmailForPasswordReset(dto.email);

    if (!user || !user.isActive) {
      throw new BadRequestException('Invalid or expired reset code');
    }

    if (
      !user.passwordResetOtpHash ||
      !user.passwordResetExpires ||
      user.passwordResetExpires.getTime() < Date.now()
    ) {
      throw new BadRequestException('Invalid or expired reset code');
    }

    const attempts = user.passwordResetAttempts ?? 0;
    if (attempts >= MAX_OTP_ATTEMPTS) {
      await this.users.clearPasswordReset(user.id);
      throw new BadRequestException(
        'Too many invalid attempts. Request a new password reset code.',
      );
    }

    const otpValid = await bcrypt.compare(dto.otp, user.passwordResetOtpHash);
    if (!otpValid) {
      await this.users.incrementPasswordResetAttempts(user.id);
      throw new BadRequestException('Invalid or expired reset code');
    }

    if (dto.newPassword === dto.otp) {
      throw new BadRequestException(
        'New password must not match the reset code',
      );
    }

    await this.users.updatePasswordAndClearReset(user.id, dto.newPassword);
    this.logger.log(`Password reset completed for user ${user.id}`);

    return { message: 'Password has been reset successfully.' };
  }

  /**
   * Change password for the authenticated user (requires current password).
   */
  async changePassword(
    authUser: AuthUser,
    dto: ChangePasswordDto,
  ): Promise<AuthMessageResult> {
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException(
        'New password must be different from the current password',
      );
    }

    const user = await this.users.findByEmailForAuth(authUser.email);
    if (!user || user.id !== authUser.userId || !user.isActive) {
      throw new UnauthorizedException('Unable to change password');
    }

    const currentValid = await bcrypt.compare(
      dto.currentPassword,
      user.password,
    );
    if (!currentValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    await this.users.updatePasswordAndClearReset(user.id, dto.newPassword);
    this.logger.log(`Password changed for user ${user.id}`);

    return { message: 'Password has been changed successfully.' };
  }

  private buildLoginResult(user: UserDocument): AuthLoginResult {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwt.sign(payload),
      tokenType: 'Bearer',
      expiresIn: this.jwtExpiresIn,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  /** Cryptographically strong 6-digit numeric OTP. */
  private generateOtp(): string {
    return randomInt(0, 1_000_000).toString().padStart(6, '0');
  }
}
