import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectModel(Notification.name)
    private readonly notifications: Model<NotificationDocument>,
    private readonly mail: MailService,
  ) {}

  /**
   * Persist an in-app notification. Optionally fan out by email to recipients.
   * Email delivery is best-effort and never fails the dashboard write path.
   */
  async create(
    dto: CreateNotificationDto,
    emailRecipients?: string | string[],
  ) {
    const notification = await this.notifications.create(dto);

    if (emailRecipients && (Array.isArray(emailRecipients) ? emailRecipients.length > 0 : true)) {
      void this.mail
        .sendNotificationEmail(emailRecipients, dto.title, dto.message)
        .catch((error: unknown) => {
          this.logger.error(
            'Notification email delivery failed',
            error instanceof Error ? error.stack : undefined,
          );
        });
    }

    return notification;
  }

  findAll() {
    return this.notifications
      .find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean()
      .exec();
  }

  async markRead(id: string) {
    const item = await this.notifications
      .findByIdAndUpdate(id, { isRead: true }, { new: true })
      .lean()
      .exec();
    if (!item) throw new NotFoundException('Notification not found');
    return item;
  }
}
