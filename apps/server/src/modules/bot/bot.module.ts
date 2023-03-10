import { Command } from '@/entities';
import { Bot } from '@/entities/bot.entity';
import { User } from '@/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandService } from '../command/command.service';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotMessagingService } from './services/bot.messaging.service';
import { BotProcessService } from './services/bot.process.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bot, User, Command])],
  providers: [
    BotService,
    BotProcessService,
    BotMessagingService,
    CommandService,
  ],
  controllers: [BotController],
})
export class BotModule {}
