import { Conversation } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationDTO } from './dto/create-conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly cnvRepo: Repository<Conversation>,
  ) {}

  async getConversationsById(id: number) {
    const conversations = await this.cnvRepo.findOne({
      where: {
        id,
      },
    });

    return conversations;
  }

  async getConversationsByBotId(botId: string) {
    const conversations = await this.cnvRepo.find({
      where: {
        bot: {
          id: botId,
        },
      },
    });

    return conversations;
  }

  createConversation(botId: string, data: CreateConversationDTO) {
    const newConversation = this.cnvRepo.create({
      bot: {
        id: botId,
      },
      name: data.name,
      script: data.script,
      updatedAt: new Date().toISOString(),
    });

    return this.cnvRepo.save(newConversation);
  }

  async updateConversation(id: number, data: CreateConversationDTO) {
    const conversation = await this.cnvRepo.findOne({
      where: {
        id,
      },
    });

    if (!conversation) {
      return null;
    }

    conversation.script = data.script;
    conversation.updatedAt = new Date().toISOString();

    return this.cnvRepo.save(conversation);
  }

  async deleteConversation(id: number) {
    const conversation = await this.cnvRepo.findOne({
      where: {
        id,
      },
    });

    if (!conversation) {
      return null;
    }

    return this.cnvRepo.remove(conversation);
  }
}
