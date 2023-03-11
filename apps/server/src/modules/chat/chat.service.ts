import { Chat, ChatType } from '@/entities/chat.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
  ) {}

  getBotChats(botId: string, type: ChatType) {
    return this.chatRepository.find({
      where: {
        bot: {
          id: botId,
        },
        type,
      },
    });
  }
}
