import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Settings, SettingsDocument } from './schemas/settings.schema';
@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly settings: Model<SettingsDocument>,
  ) {}
  find() {
    return this.settings.findOne().lean().exec();
  }
  update(dto: UpdateSettingsDto) {
    return this.settings
      .findOneAndUpdate(
        {},
        { $set: dto },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          runValidators: true,
        },
      )
      .lean()
      .exec();
  }
}
