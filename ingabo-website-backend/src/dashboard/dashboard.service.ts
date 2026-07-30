import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../blog/schemas/blog.schema';
import { Comment, CommentDocument } from '../comments/schemas/comment.schema';
import { Feature, FeatureDocument } from '../features/schemas/feature.schema';
import { Member, MemberDocument } from '../members/schemas/member.schema';
import { Message, MessageDocument } from '../messages/schemas/message.schema';
import { Partner, PartnerDocument } from '../partners/schemas/partner.schema';
import { Rating, RatingDocument } from '../ratings/schemas/rating.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Blog.name) private blogs: Model<BlogDocument>,
    @InjectModel(Member.name) private members: Model<MemberDocument>,
    @InjectModel(Partner.name) private partners: Model<PartnerDocument>,
    @InjectModel(Feature.name) private features: Model<FeatureDocument>,
    @InjectModel(Message.name) private messages: Model<MessageDocument>,
    @InjectModel(Comment.name) private comments: Model<CommentDocument>,
    @InjectModel(Rating.name) private ratings: Model<RatingDocument>,
  ) {}

  async stats() {
    const [blogs, members, partners, features, messages, comments, ratings] =
      await Promise.all([
        this.blogs.countDocuments({ isDeleted: false }),
        this.members.countDocuments({ isDeleted: false }),
        this.partners.countDocuments({ isDeleted: false }),
        this.features.countDocuments({ isDeleted: false }),
        this.messages.countDocuments({ isDeleted: false }),
        this.comments.countDocuments({ isDeleted: false, approved: false }),
        this.ratings.countDocuments({}),
      ]);
    return { blogs, members, partners, features, messages, comments, ratings };
  }

  async activity() {
    const [messages, comments] = await Promise.all([
      this.messages
        .find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
      this.comments
        .find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
    ]);
    const items = [
      ...messages.map((item) => ({
        type: 'MESSAGE',
        createdAt: item.createdAt ? new Date(item.createdAt) : new Date(0),
        data: item,
      })),
      ...comments.map((item) => ({
        type: 'COMMENT',
        createdAt: item.createdAt ? new Date(item.createdAt) : new Date(0),
        data: item,
      })),
    ];
    return items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 20);
  }
}
