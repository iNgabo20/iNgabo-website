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

const BCRYPT_ROUNDS = 12;

/** Fields selected when auth needs the password hash. */
const AUTH_PASSWORD_SELECT = '+password';

/** Fields selected for password-reset verification. */
const AUTH_RESET_SELECT =
  '+password +passwordResetOtpHash +passwordResetExpires +passwordResetAttempts';

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
      password: await bcrypt.hash(dto.password, BCRYPT_ROUNDS),
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

  /**
   * Load an active (non-deleted) user by id for JWT strategy re-validation.
   */
  async findActiveById(id: string): Promise<UserDocument | null> {
    return this.users
      .findOne({ _id: id, isDeleted: false, isActive: true })
      .exec();
  }

  /**
   * Load a user with password for login credential checks.
   */
  async findByEmailForAuth(email: string): Promise<UserDocument | null> {
    return this.users
      .findOne({ email: email.toLowerCase(), isDeleted: false })
      .select(AUTH_PASSWORD_SELECT)
      .exec();
  }

  /**
   * Load a user with password-reset OTP fields for reset verification.
   */
  async findByEmailForPasswordReset(
    email: string,
  ): Promise<UserDocument | null> {
    return this.users
      .findOne({ email: email.toLowerCase(), isDeleted: false })
      .select(AUTH_RESET_SELECT)
      .exec();
  }

  /** @deprecated Prefer findByEmailForAuth for authentication flows. */
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findByEmailForAuth(email);
  }

  async update(id: string, dto: UpdateUserDto): Promise<Partial<User>> {
    const data = {
      ...dto,
      ...(dto.password
        ? { password: await bcrypt.hash(dto.password, BCRYPT_ROUNDS) }
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

  /**
   * Persist a hashed password-reset OTP and expiry window.
   */
  async setPasswordResetOtp(
    userId: string,
    otpHash: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.users.updateOne(
      { _id: userId, isDeleted: false },
      {
        passwordResetOtpHash: otpHash,
        passwordResetExpires: expiresAt,
        passwordResetAttempts: 0,
      },
    );
  }

  /**
   * Increment failed OTP attempts; used to lock out brute-force guesses.
   */
  async incrementPasswordResetAttempts(userId: string): Promise<void> {
    await this.users.updateOne(
      { _id: userId },
      { $inc: { passwordResetAttempts: 1 } },
    );
  }

  /**
   * Replace the password and clear any outstanding reset OTP state.
   */
  async updatePasswordAndClearReset(
    userId: string,
    plainPassword: string,
  ): Promise<void> {
    const password = await bcrypt.hash(plainPassword, BCRYPT_ROUNDS);
    const result = await this.users.updateOne(
      { _id: userId, isDeleted: false },
      {
        password,
        $unset: {
          passwordResetOtpHash: 1,
          passwordResetExpires: 1,
          passwordResetAttempts: 1,
        },
      },
    );
    if (!result.matchedCount) throw new NotFoundException('User not found');
  }

  /**
   * Clear outstanding password-reset OTP state without changing the password.
   */
  async clearPasswordReset(userId: string): Promise<void> {
    await this.users.updateOne(
      { _id: userId },
      {
        $unset: {
          passwordResetOtpHash: 1,
          passwordResetExpires: 1,
          passwordResetAttempts: 1,
        },
      },
    );
  }

  private publicUser(user: UserDocument): Partial<User> {
    const value: Record<string, any> = user.toObject();
    delete value.password;
    delete value.passwordResetOtpHash;
    delete value.passwordResetExpires;
    delete value.passwordResetAttempts;
    return value as Partial<User>;
  }
}
