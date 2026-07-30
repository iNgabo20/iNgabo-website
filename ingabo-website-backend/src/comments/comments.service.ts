import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly comments: Model<CommentDocument>,
  ) {}

  create(dto: CreateCommentDto) {
    return this.comments.create(dto);
  }
  findAll(blog?: string, includeUnapproved = false) {
    const filter = {
      isDeleted: false,
      ...(includeUnapproved ? {} : { approved: true }),
      ...(blog ? { blog } : {}),
    };
    return this.comments.find(filter).sort({ createdAt: -1 }).lean().exec();
  }
  async findOne(id: string) {
    const comment = await this.comments
      .findOne({ _id: id, isDeleted: false })
      .lean()
      .exec();
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }
  async update(id: string, dto: UpdateCommentDto) {
    const comment = await this.comments
      .findOneAndUpdate({ _id: id, isDeleted: false }, dto, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }
  async setApproval(id: string, approved: boolean) {
    return this.update(id, { approved });
  }
  async remove(id: string) {
    const result = await this.comments.updateOne(
      { _id: id, isDeleted: false },
      { isDeleted: true },
    );
    if (!result.modifiedCount) throw new NotFoundException('Comment not found');
    return { deleted: true };
  }
}
