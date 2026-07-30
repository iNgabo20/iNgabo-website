import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner, PartnerDocument } from './schemas/partner.schema';
@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner.name)
    private readonly partners: Model<PartnerDocument>,
  ) {}
  create(dto: CreatePartnerDto) {
    return this.partners.create(dto);
  }
  findAll() {
    return this.partners
      .find({ isDeleted: false })
      .sort({ displayOrder: 1 })
      .lean()
      .exec();
  }
  async findOne(id: string) {
    const item = await this.partners
      .findOne({ _id: id, isDeleted: false })
      .lean()
      .exec();
    if (!item) throw new NotFoundException('Partner not found');
    return item;
  }
  async update(id: string, dto: UpdatePartnerDto) {
    const item = await this.partners
      .findOneAndUpdate({ _id: id, isDeleted: false }, dto, { new: true })
      .lean()
      .exec();
    if (!item) throw new NotFoundException('Partner not found');
    return item;
  }
  async remove(id: string) {
    const result = await this.partners.updateOne(
      { _id: id, isDeleted: false },
      { isDeleted: true },
    );
    if (!result.modifiedCount) throw new NotFoundException('Partner not found');
    return { deleted: true };
  }
}
