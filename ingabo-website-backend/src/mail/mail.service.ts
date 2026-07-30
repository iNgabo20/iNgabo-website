import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import {
  ContactMailPayload,
  MailMessage,
  PasswordResetMailPayload,
} from './interfaces/mail-message.interface';
import {
  contactConfirmationTemplate,
  contactTeamNotificationTemplate,
  notificationEmailTemplate,
  passwordResetOtpTemplate,
  welcomeEmailTemplate,
} from './templates/mail.templates';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter?: Transporter;
  private readonly from?: string;
  private readonly adminInbox?: string;
  private readonly frontendUrl: string;
  private readonly enabled: boolean;

  constructor(private readonly config: ConfigService) {
    const host = this.config.get<string>('mail.host');
    const user = this.config.get<string>('mail.user');
    const password = this.config.get<string>('mail.password');
    const from = this.config.get<string>('mail.from') ?? user;
    const port = this.config.get<number>('mail.port', 587);
    const secure = this.config.get<boolean>('mail.secure', false);

    this.from = from;
    this.adminInbox = this.config.get<string>('mail.adminEmail') || from;
    this.frontendUrl = this.config.get<string>(
      'mail.frontendUrl',
      'http://localhost:3000',
    );

    if (host && user && password && from) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass: password },
      });
      this.enabled = true;
    } else {
      this.enabled = false;
      this.logger.warn(
        'SMTP is not fully configured; outbound email delivery is disabled.',
      );
    }
  }

  /**
   * Whether SMTP transport is configured and ready for delivery attempts.
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Low-level send. Returns false when SMTP is disabled or delivery fails.
   * Failures are logged without secrets or full message bodies.
   */
  async send(message: MailMessage): Promise<boolean> {
    if (!this.transporter || !this.from) {
      this.logger.warn(
        `Email skipped because SMTP is not configured: ${message.subject}`,
      );
      return false;
    }

    try {
      await this.transporter.sendMail({
        from: this.from,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
        replyTo: message.replyTo,
      });
      return true;
    } catch (error: unknown) {
      this.logger.error(
        `Email delivery failed for subject "${message.subject}"`,
        error instanceof Error ? error.stack : undefined,
      );
      return false;
    }
  }

  /**
   * Confirm receipt of a public contact form submission to the visitor.
   */
  sendContactConfirmation(
    to: string,
    name: string,
    subject: string,
  ): Promise<boolean> {
    const template = contactConfirmationTemplate(
      name,
      subject,
      this.frontendUrl,
    );
    return this.send({ to, ...template });
  }

  /**
   * Notify the team inbox about a new contact form submission.
   */
  sendContactTeamNotification(payload: ContactMailPayload): Promise<boolean> {
    if (!this.adminInbox) {
      this.logger.warn(
        'Team contact notification skipped: no admin inbox configured.',
      );
      return Promise.resolve(false);
    }

    const template = contactTeamNotificationTemplate(payload, this.frontendUrl);
    return this.send({
      to: this.adminInbox,
      replyTo: payload.email,
      ...template,
    });
  }

  /**
   * Welcome email for newly created administrator / maintainer accounts.
   */
  sendWelcomeEmail(
    to: string,
    firstName: string,
    role = 'team member',
  ): Promise<boolean> {
    const template = welcomeEmailTemplate(firstName, role, this.frontendUrl);
    return this.send({ to, ...template });
  }

  /**
   * Password-reset OTP delivery for authenticated team accounts.
   */
  sendPasswordResetOtp(payload: PasswordResetMailPayload): Promise<boolean> {
    const template = passwordResetOtpTemplate(payload, this.frontendUrl);
    return this.send({ to: payload.to, ...template });
  }

  /**
   * Generic notification email for dashboard / system alerts.
   */
  sendNotificationEmail(
    to: string | string[],
    title: string,
    message: string,
  ): Promise<boolean> {
    const template = notificationEmailTemplate(
      title,
      message,
      this.frontendUrl,
    );
    return this.send({ to, ...template });
  }
}
