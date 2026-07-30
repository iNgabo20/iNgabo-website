import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../common/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const auth = {
    login: jest.fn(),
    profile: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
    changePassword: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: auth }],
    }).compile();

    controller = module.get(AuthController);
  });

  it('delegates login', async () => {
    const dto = { email: 'admin@ingabo.org', password: 'CorrectP@ss1' };
    auth.login.mockResolvedValue({ accessToken: 't' });

    await expect(controller.login(dto)).resolves.toEqual({ accessToken: 't' });
    expect(auth.login).toHaveBeenCalledWith(dto);
  });

  it('delegates profile', async () => {
    const user = {
      userId: 'user-1',
      email: 'admin@ingabo.org',
      role: Role.ADMINISTRATOR,
    };
    auth.profile.mockResolvedValue({ email: 'admin@ingabo.org' });

    await expect(controller.profile(user)).resolves.toEqual({
      email: 'admin@ingabo.org',
    });
    expect(auth.profile).toHaveBeenCalledWith(user);
  });

  it('delegates forgotPassword', async () => {
    const dto = { email: 'admin@ingabo.org' };
    auth.forgotPassword.mockResolvedValue({ message: 'ok' });

    await expect(controller.forgotPassword(dto)).resolves.toEqual({
      message: 'ok',
    });
    expect(auth.forgotPassword).toHaveBeenCalledWith(dto);
  });

  it('delegates resetPassword', async () => {
    const dto = {
      email: 'admin@ingabo.org',
      otp: '123456',
      newPassword: 'NewP@ssword1',
    };
    auth.resetPassword.mockResolvedValue({ message: 'reset' });

    await expect(controller.resetPassword(dto)).resolves.toEqual({
      message: 'reset',
    });
    expect(auth.resetPassword).toHaveBeenCalledWith(dto);
  });

  it('delegates changePassword', async () => {
    const user = {
      userId: 'user-1',
      email: 'admin@ingabo.org',
      role: Role.ADMINISTRATOR,
    };
    const dto = {
      currentPassword: 'OldP@ssword1',
      newPassword: 'NewP@ssword1',
    };
    auth.changePassword.mockResolvedValue({ message: 'changed' });

    await expect(controller.changePassword(user, dto)).resolves.toEqual({
      message: 'changed',
    });
    expect(auth.changePassword).toHaveBeenCalledWith(user, dto);
  });
});
