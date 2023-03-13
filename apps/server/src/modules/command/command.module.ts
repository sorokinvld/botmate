import { Command, Settings } from '@/entities';
import { Chat } from '@/entities/chat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from 'grammy';
import { BotModule } from '../bot/bot.module';
import { SettingsService } from '../settings/settings.service';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';

@Module({
  imports: [
    BotModule,
    TypeOrmModule.forFeature([Command, Bot, Chat, Settings]),
  ],
  controllers: [CommandController],
  providers: [CommandService, SettingsService],
})
export class CommandModule {}
