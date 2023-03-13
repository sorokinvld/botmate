import * as path from 'path';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { SentryInterceptor } from './interceptors/sentry.interceptor';

// App Modules
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/users/user.module';
import { DatabaseModule } from '@modules/database/database.module';
import { BotModule } from '@/modules/bot/bot.module';
import { CommandModule } from '@/modules/command/command.module';
import { ChatModule } from './modules/chat/chat.module';
import { DownloadController } from './modules/download/download.controller';
import { FiltersModule } from './modules/filters/filters.module';
import { BotMateModule } from './modules/botmate/botmate.module';
import { AnnouncementsModule } from './modules/ancmt/ancmt.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './entities';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'client'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forFeature([Settings]),
    BotMateModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    BotModule,
    CommandModule,
    ChatModule,
    FiltersModule,
    AnnouncementsModule,
  ],
  controllers: [DownloadController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
  ],
})
export class AppModule {}
