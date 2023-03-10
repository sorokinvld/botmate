import { Command } from '@/entities';
import { Bot } from '@/entities/bot.entity';
import { User } from '@/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandService } from '../command/command.service';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotScriptService } from './services/bot.script.service';
import { BotProcessService } from './services/bot.process.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bot, User, Command])],
  providers: [BotService, BotProcessService, BotScriptService, CommandService],
  controllers: [BotController],
})
export class BotModule {}
