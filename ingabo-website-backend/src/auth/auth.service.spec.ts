import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/constants';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const users = {
    findByEmailForAuth: jest.fn(),
    findByEmailForPasswordReset: jest.fn(),
    findOne: jest.fn(),
    markLogin: jest.fn(),
    setPasswordResetOtp: jest.fn(),
    incrementPasswordResetAttempts: jest.fn(),
    updatePasswordAndClearReset: jest.fn(),
    clearPasswordReset: jest.fn(),
  };

  const jwt = {
    sign: jest.fn().mockReturnValue('signed.jwt.token'),
  };

  const mail = {
    sendPasswordResetOtp: jest.fn().mockResolvedValue(true),
  };

  const config = {
    get: jest.fn((key: string, fallback?: string) => {
      if (key === 'jwtExpiresIn') return '1h';
      return fallback;
    }),
  };

  const activeUser = {
    id: 'user-1',
    firstName: 'Ada',
    lastName: 'Admin',
    email: 'admin@ingabo.org',
    role: Role.ADMINISTRATOR,
    password: '',
    isActive: true,
    avatar: undefined,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    activeUser.password = await bcrypt.hash('CorrectP@ss1', 4);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: users },
        { provide: JwtService, useValue: jwt },
        { provide: MailService, useValue: mail },
        { provide: ConfigService, useValue: config },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('login', () => {
    it('returns access token and public user on valid credentials', async () => {
      users.findByEmailForAuth.mockResolvedValue(activeUser);

      const result = await service.login({
        email: 'admin@ingabo.org',
        password: 'CorrectP@ss1',
      });

      expect(users.markLogin).toHaveBeenCalledWith('user-1');
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          sub: 'user-1',
          email: 'admin@ingabo.org',
          role: Role.ADMINISTRATOR,
        }),
      );
      expect(result).toEqual({
        accessToken: 'signed.jwt.token',
        tokenType: 'Bearer',
        expiresIn: '1h',
        user: {
          id: 'user-1',
          firstName: 'Ada',
          lastName: 'Admin',
          email: 'admin@ingabo.org',
          role: Role.ADMINISTRATOR,
          avatar: undefined,
        },
      });
    });

    it('rejects invalid password', async () => {
      users.findByEmailForAuth.mockResolvedValue(activeUser);

      await expect(
        service.login({
          email: 'admin@ingabo.org',
          password: 'wrong-password',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('rejects unknown email without leaking existence', async () => {
      users.findByEmailForAuth.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'nobody@ingabo.org',
          password: 'whatever12',
        }),
      ).rejects.toThrow('Invalid email or password');
    });

    it('rejects inactive accounts', async () => {
      users.findByEmailForAuth.mockResolvedValue({
        ...activeUser,
        isActive: false,
      });

      await expect(
        service.login({
          email: 'admin@ingabo.org',
          password: 'CorrectP@ss1',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });

  describe('forgotPassword', () => {
    it('returns a generic message and emails OTP for active users', async () => {
      users.findByEmailForAuth.mockResolvedValue(activeUser);

      const result = await service.forgotPassword({
        email: 'admin@ingabo.org',
      });

      expect(users.setPasswordResetOtp).toHaveBeenCalled();
      expect(mail.sendPasswordResetOtp).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'admin@ingabo.org',
          firstName: 'Ada',
          expiresInMinutes: 15,
        }),
      );
      expect(result.message).toContain('If an account exists');
    });

    it('returns the same generic message when the user is missing', async () => {
      users.findByEmailForAuth.mockResolvedValue(null);

      const result = await service.forgotPassword({
        email: 'missing@ingabo.org',
      });

      expect(users.setPasswordResetOtp).not.toHaveBeenCalled();
      expect(mail.sendPasswordResetOtp).not.toHaveBeenCalled();
      expect(result.message).toContain('If an account exists');
    });
  });

  describe('resetPassword', () => {
    it('resets password when OTP is valid', async () => {
      const otpHash = await bcrypt.hash('123456', 4);
      users.findByEmailForPasswordReset.mockResolvedValue({
        ...activeUser,
        passwordResetOtpHash: otpHash,
        passwordResetExpires: new Date(Date.now() + 60_000),
        passwordResetAttempts: 0,
      });

      const result = await service.resetPassword({
        email: 'admin@ingabo.org',
        otp: '123456',
        newPassword: 'BrandNewP@ss1',
      });

      expect(users.updatePasswordAndClearReset).toHaveBeenCalledWith(
        'user-1',
        'BrandNewP@ss1',
      );
      expect(result.message).toContain('reset successfully');
    });

    it('rejects expired OTP', async () => {
      const otpHash = await bcrypt.hash('123456', 4);
      users.findByEmailForPasswordReset.mockResolvedValue({
        ...activeUser,
        passwordResetOtpHash: otpHash,
        passwordResetExpires: new Date(Date.now() - 1_000),
        passwordResetAttempts: 0,
      });

      await expect(
        service.resetPassword({
          email: 'admin@ingabo.org',
          otp: '123456',
          newPassword: 'BrandNewP@ss1',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('increments attempts and rejects invalid OTP', async () => {
      const otpHash = await bcrypt.hash('123456', 4);
      users.findByEmailForPasswordReset.mockResolvedValue({
        ...activeUser,
        passwordResetOtpHash: otpHash,
        passwordResetExpires: new Date(Date.now() + 60_000),
        passwordResetAttempts: 1,
      });

      await expect(
        service.resetPassword({
          email: 'admin@ingabo.org',
          otp: '000000',
          newPassword: 'BrandNewP@ss1',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(users.incrementPasswordResetAttempts).toHaveBeenCalledWith(
        'user-1',
      );
    });

    it('locks out after too many failed attempts', async () => {
      const otpHash = await bcrypt.hash('123456', 4);
      users.findByEmailForPasswordReset.mockResolvedValue({
        ...activeUser,
        passwordResetOtpHash: otpHash,
        passwordResetExpires: new Date(Date.now() + 60_000),
        passwordResetAttempts: 5,
      });

      await expect(
        service.resetPassword({
          email: 'admin@ingabo.org',
          otp: '123456',
          newPassword: 'BrandNewP@ss1',
        }),
      ).rejects.toThrow(/Too many invalid attempts/);

      expect(users.clearPasswordReset).toHaveBeenCalledWith('user-1');
    });
  });

  describe('changePassword', () => {
    it('updates password when current password matches', async () => {
      users.findByEmailForAuth.mockResolvedValue(activeUser);

      const result = await service.changePassword(
        {
          userId: 'user-1',
          email: 'admin@ingabo.org',
          role: Role.ADMINISTRATOR,
        },
        {
          currentPassword: 'CorrectP@ss1',
          newPassword: 'EvenStronger1!',
        },
      );

      expect(users.updatePasswordAndClearReset).toHaveBeenCalledWith(
        'user-1',
        'EvenStronger1!',
      );
      expect(result.message).toContain('changed successfully');
    });

    it('rejects incorrect current password', async () => {
      users.findByEmailForAuth.mockResolvedValue(activeUser);

      await expect(
        service.changePassword(
          {
            userId: 'user-1',
            email: 'admin@ingabo.org',
            role: Role.ADMINISTRATOR,
          },
          {
            currentPassword: 'not-the-password',
            newPassword: 'EvenStronger1!',
          },
        ),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('rejects when new password equals current password', async () => {
      await expect(
        service.changePassword(
          {
            userId: 'user-1',
            email: 'admin@ingabo.org',
            role: Role.ADMINISTRATOR,
          },
          {
            currentPassword: 'SameP@ssword1',
            newPassword: 'SameP@ssword1',
          },
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('profile', () => {
    it('delegates to UsersService.findOne', async () => {
      users.findOne.mockResolvedValue({
        id: 'user-1',
        email: 'admin@ingabo.org',
      });

      await expect(
        service.profile({
          userId: 'user-1',
          email: 'admin@ingabo.org',
          role: Role.ADMINISTRATOR,
        }),
      ).resolves.toEqual({ id: 'user-1', email: 'admin@ingabo.org' });

      expect(users.findOne).toHaveBeenCalledWith('user-1');
    });
  });
});
