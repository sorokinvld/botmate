import { Bot } from '@/entities/bot.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bot as TelegramBot } from 'grammy';
import { DownloadService } from '../download/download.service';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot) private botRepository: Repository<Bot>,
    private readonly downloadService: DownloadService,
  ) {}

  getBotsByUserId(id: number) {
    return this.botRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

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
      created_at: new Date().toISOString(),
      user: {
        id: userId,
      },
    });
    await this.botRepository.save(botEntity);

    const botPhotos = await bot.api.getUserProfilePhotos(botData.id);
    if (botPhotos) {
      const file = await bot.api.getFile(botPhotos.photos[0][0].file_id);
      this.downloadService.download(
        `https://api.telegram.org/file/bot${token}/${file.file_path}`,
        'photo',
        `${botData.id.toString()}.jpg`,
      );
    }

    return botEntity;
  }

  updateBot(id: string, data: Partial<Bot>) {
    return this.botRepository.update(
      { id },
      {
        ...data,
      },
    );
  }

  async deleteBot(id: string) {
    return this.botRepository.delete({
      id,
    });
  }
}
