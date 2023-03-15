import { Bot, Conversation } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Bot])],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {}
