import { Bot } from '@/entities/bot.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bot as TelegramBot } from 'grammy';

@Injectable()
export class BotService {
  constructor(@InjectRepository(Bot) private botRepository: Repository<Bot>) {}

  getBotsByUserId(id: number) {
    return this.botRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  // async updateBotProfilePic(token: string) {}

  async createBot(token: string, userId: number) {
    const bot = new TelegramBot(token);
    await bot.init();
    const botData = await bot.api.getMe();

    const existingBot = await this.botRepository.count({
      where: {
        id: botData.id.toString(),
      },
    });

    if (existingBot) {
      throw new Error('Bot already exists');
    }

    const botEntity = this.botRepository.create({
      token,
      id: botData.id.toString(),
      avatar: '',
      username: botData.username,
      first_name: botData.first_name,
      createdAt: new Date().toISOString(),
      user: {
        id: userId,
      },
    });
    await this.botRepository.save(botEntity);
    return botEntity;
  }
}
