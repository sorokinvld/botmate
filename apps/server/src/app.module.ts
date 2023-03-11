import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'client'),
      exclude: ['/api/(.*)'],
    }),
    BotMateModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    BotModule,
    CommandModule,
    ChatModule,
    FiltersModule,
  ],
  controllers: [DownloadController],
  providers: [],
})
export class AppModule {}
