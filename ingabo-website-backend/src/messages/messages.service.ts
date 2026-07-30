import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationType } from '../common/constants';
import { MailService } from '../mail/mail.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    @InjectModel(Message.name)
    private readonly messages: Model<MessageDocument>,
    private readonly mail: MailService,
    private readonly notifications: NotificationsService,
  ) {}

  async create(dto: CreateMessageDto) {
    const message = await this.messages.create(dto);

    // Side effects must not fail the public contact submission.
    void this.dispatchContactSideEffects(dto).catch((error: unknown) => {
      this.logger.error(
        'Contact message side effects failed',
        error instanceof Error ? error.stack : undefined,
      );
    });

    return message;
  }

  findAll() {
    return this.messages
      .find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async findOne(id: string) {
    const item = await this.messages
      .findOne({ _id: id, isDeleted: false })
      .lean()
      .exec();
    if (!item) throw new NotFoundException('Message not found');
    return item;
  }

  async markRead(id: string) {
    const item = await this.messages
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isRead: true },
        { new: true },
      )
      .lean()
      .exec();
    if (!item) throw new NotFoundException('Message not found');
    return item;
  }

  async update(id: string, dto: UpdateMessageDto) {
    const item = await this.messages
      .findOneAndUpdate({ _id: id, isDeleted: false }, dto, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
    if (!item) throw new NotFoundException('Message not found');
    return item;
  }

  async remove(id: string) {
    const result = await this.messages.updateOne(
      { _id: id, isDeleted: false },
      { isDeleted: true },
    );
    if (!result.modifiedCount) throw new NotFoundException('Message not found');
    return { deleted: true };
  }

  /**
   * Confirm to the visitor, alert the team inbox, and create a dashboard notification.
   */
  private async dispatchContactSideEffects(dto: CreateMessageDto): Promise<void> {
    await Promise.all([
      this.mail.sendContactConfirmation(dto.email, dto.name, dto.subject),
      this.mail.sendContactTeamNotification({
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        subject: dto.subject,
        message: dto.message,
      }),
      this.notifications.create({
        title: `New contact message from ${dto.name}`,
        message: `${dto.subject}: ${dto.message.slice(0, 240)}`,
        type: NotificationType.MESSAGE,
      }),
    ]);
  }
}
