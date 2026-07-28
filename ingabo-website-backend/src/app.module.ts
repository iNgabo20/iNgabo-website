import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';
import { MembersModule } from './members/members.module';
import { FeaturesModule } from './features/features.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PartnersModule } from './partners/partners.module';
import { RatingsModule } from './ratings/ratings.module';
import { HealthController } from './health.controller';


@Module({
 

  imports: [AppConfigModule, DatabaseModule, ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]), AuthModule, UsersModule, BlogModule, MembersModule, PartnersModule, RatingsModule, FeaturesModule, CommentsModule, NotificationsModule, MessagesModule],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class AppModule {}
