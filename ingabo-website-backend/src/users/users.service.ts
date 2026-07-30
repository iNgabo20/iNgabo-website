import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    private readonly mail: MailService,
  ) {}

  async create(dto: CreateUserDto): Promise<Partial<User>> {
    const exists = await this.users.exists({
      email: dto.email.toLowerCase(),
      isDeleted: false,
    });
    if (exists) throw new ConflictException('Email is already registered');

    const user = await this.users.create({
      ...dto,
      email: dto.email.toLowerCase(),
      password: await bcrypt.hash(dto.password, 12),
    });

    // Welcome email is best-effort; account creation must succeed either way.
    void this.mail.sendWelcomeEmail(user.email, user.firstName, user.role);

    return this.publicUser(user);
  }

  findAll(): Promise<Partial<User>[]> {
    return this.users
      .find({ isDeleted: false })
      .select('-password')
      .lean()
      .exec() as Promise<Partial<User>[]>;
  }

  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.users
      .findOne({ _id: id, isDeleted: false })
      .select('-password')
      .lean()
      .exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.users
      .findOne({ email: email.toLowerCase(), isDeleted: false })
      .select('+password')
      .exec();
  }

  async update(id: string, dto: UpdateUserDto): Promise<Partial<User>> {
    const data = {
      ...dto,
      ...(dto.password
        ? { password: await bcrypt.hash(dto.password, 12) }
        : {}),
    };
    const user = await this.users
      .findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true })
      .select('-password')
      .lean()
      .exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: string): Promise<{ deleted: true }> {
    const result = await this.users.updateOne(
      { _id: id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
    );
    if (!result.modifiedCount) throw new NotFoundException('User not found');
    return { deleted: true };
  }

  async markLogin(id: string): Promise<void> {
    await this.users.updateOne({ _id: id }, { lastLogin: new Date() });
  }

  private publicUser(user: UserDocument): Partial<User> {
    const value = user.toObject();
    delete value.password;
    return value;
  }
}
