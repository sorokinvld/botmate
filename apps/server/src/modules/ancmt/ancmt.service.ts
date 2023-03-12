import { Bot } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bot as TelegramBot } from 'grammy';

@Injectable()
export class AnnouncementsService {
  constructor(@InjectRepository(Bot) private botRepository: Repository<Bot>) {}

  async createAnnouncement(botId: string, chatId: string, text: string) {
    try {
      const botData = await this.botRepository.findOne({
        where: { id: botId },
      });
      if (!botData) {
        throw new Error('Bot not found');
      }

      const bot = new TelegramBot(botData.token);
      await bot.init();

      await bot.api.sendMessage(chatId, text);
    } catch (e) {}
  }
}
