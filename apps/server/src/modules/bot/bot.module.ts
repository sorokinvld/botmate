import { Bot } from '@/entities/bot.entity';
import { User } from '@/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotMessagingService } from './services/bot.messaging.service';
import { BotProcessService } from './services/bot.process.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bot, User])],
  providers: [BotService, BotProcessService, BotMessagingService],
  controllers: [BotController],
})
export class BotModule {}
