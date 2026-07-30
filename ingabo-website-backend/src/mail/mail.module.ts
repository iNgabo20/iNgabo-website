import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

/**
 * Global mail infrastructure module.
 * Exposes MailService to feature modules (messages, users, notifications, auth)
 * without requiring repeated imports.
 */
@Global()
@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
