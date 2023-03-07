import { Bot } from '@/entities/bot.entity';
import { User } from '@/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bot, User])],
  providers: [BotService],
  controllers: [BotController],
})
export class BotModule {}
