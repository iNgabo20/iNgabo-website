import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';

const sendMailMock = jest.fn();

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: jest.fn(() => ({
      sendMail: sendMailMock,
    })),
  },
}));

describe('MailService', () => {
  const configuredEnv: Record<string, string | number | boolean> = {
    'mail.host': 'smtp.example.org',
    'mail.port': 587,
    'mail.secure': false,
    'mail.user': 'mailer@example.org',
    'mail.password': 'secret',
    'mail.from': 'mailer@example.org',
    'mail.adminEmail': 'team@example.org',
    'mail.frontendUrl': 'https://ingabo.org',
  };

  async function createService(
    overrides: Record<string, string | number | boolean | undefined> = {},
  ): Promise<MailService> {
    const values = { ...configuredEnv, ...overrides };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ConfigService,
          useValue: {
            get: <T>(key: string, defaultValue?: T): T | undefined => {
              if (Object.prototype.hasOwnProperty.call(values, key)) {
                return values[key] as T;
              }
              return defaultValue;
            },
          },
        },
      ],
    }).compile();

    return module.get(MailService);
  }

  beforeEach(() => {
    sendMailMock.mockReset();
    sendMailMock.mockResolvedValue({ messageId: 'test-id' });
  });

  it('is enabled when SMTP credentials are present', async () => {
    const service = await createService();
    expect(service.isEnabled()).toBe(true);
  });

  it('is disabled when SMTP is incomplete', async () => {
    const service = await createService({
      'mail.host': undefined,
      'mail.user': undefined,
      'mail.password': undefined,
    });
    expect(service.isEnabled()).toBe(false);
  });

  it('sends contact confirmation emails', async () => {
    const service = await createService();
    const result = await service.sendContactConfirmation(
      'visitor@example.com',
      'Ada',
      'Partnership',
    );

    expect(result).toBe(true);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'visitor@example.com',
        subject: expect.stringContaining('We received your message'),
        from: 'mailer@example.org',
      }),
    );
  });

  it('notifies the team inbox about contact submissions', async () => {
    const service = await createService();
    const result = await service.sendContactTeamNotification({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      phone: '+250700000000',
      subject: 'Partnership',
      message: 'I would like to collaborate with the iNgabo team.',
    });

    expect(result).toBe(true);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'team@example.org',
        replyTo: 'ada@example.com',
        subject: expect.stringContaining('Partnership'),
      }),
    );
  });

  it('sends welcome emails for new team accounts', async () => {
    const service = await createService();
    const result = await service.sendWelcomeEmail(
      'maintainer@example.com',
      'Grace',
      'MAINTAINER',
    );

    expect(result).toBe(true);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'maintainer@example.com',
        subject: 'Welcome to the iNgabo team',
      }),
    );
  });

  it('sends password reset OTP emails', async () => {
    const service = await createService();
    const result = await service.sendPasswordResetOtp({
      to: 'admin@example.com',
      firstName: 'Ada',
      otp: '483921',
      expiresInMinutes: 15,
    });

    expect(result).toBe(true);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'admin@example.com',
        subject: 'Your iNgabo password reset code',
        text: expect.stringContaining('483921'),
      }),
    );
  });

  it('returns false and does not throw when SMTP is disabled', async () => {
    const service = await createService({
      'mail.host': undefined,
      'mail.user': undefined,
      'mail.password': undefined,
      'mail.from': undefined,
    });

    const result = await service.sendNotificationEmail(
      'a@example.com',
      'Alert',
      'Something happened',
    );

    expect(result).toBe(false);
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});
