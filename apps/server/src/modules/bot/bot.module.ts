import { Command, Conversation, Settings, Storage } from '@/entities';
import { Bot } from '@/entities/bot.entity';
import { User } from '@/entities/user.entity';
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandService } from '../command/command.service';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotProcessService } from './services/bot.process.service';
import { Chat } from '@/entities/chat.entity';
import { ChatService } from '../chat/chat.service';
import { DownloadService } from '../download/download.service';
import { BotFilterService } from './services/bot.filter.service';
import { Filter } from '@/entities/filter.entity';
import { SettingsService } from '../settings/settings.service';
import { StorageService } from '../storage/storage.service';
import { BotSandbox } from './services/bot.sandbox';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bot,
      User,
      Command,
      Chat,
      Filter,
      Settings,
      Storage,
      Conversation,
    ]),
  ],
  providers: [
    BotService,
    BotProcessService,
    CommandService,
    ChatService,
    DownloadService,
    BotFilterService,
    SettingsService,
    BotSandbox,
    StorageService,
  ],
  controllers: [BotController],
  exports: [],
})
export class BotModule implements OnModuleInit {
  constructor(private readonly botProcessService: BotProcessService) {}
  onModuleInit() {
    this.botProcessService.startAllBots();
  }
}
