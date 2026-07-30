import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member, MemberDocument } from './schemas/member.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private readonly members: Model<MemberDocument>,
  ) {}
  create(dto: CreateMemberDto) {
    return this.members.create(dto);
  }
  findAll() {
    return this.members
      .find({ isDeleted: false })
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean()
      .exec();
  }
  async findOne(id: string) {
    const member = await this.members
      .findOne({ _id: id, isDeleted: false })
      .lean()
      .exec();
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }
  async update(id: string, dto: UpdateMemberDto) {
    const member = await this.members
      .findOneAndUpdate({ _id: id, isDeleted: false }, dto, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }
  async remove(id: string) {
    const result = await this.members.updateOne(
      { _id: id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
    );
    if (!result.modifiedCount) throw new NotFoundException('Member not found');
    return { deleted: true };
  }
}
