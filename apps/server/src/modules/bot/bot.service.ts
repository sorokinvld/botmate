import { Bot } from '@/entities/bot.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bot as TelegramBot, Context } from 'grammy';
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
    return botEntity;
  }

  async downloadChatPhoto(ctx: Context) {
    // const { photo } = await ctx.getChat();
    // if (photo) {
    //   const file = await ctx.api.getFile(photo.small_file_id);
    //   this.downloadService.download(
    //     `https://api.telegram.org/file/bot${botData.token}/${file.file_path}`,
    //     'chat_photo',
    //     `${ctx.from.id}.jpg`,
    //   );
    // }
  }

  async downloadUserPhoto(ctx: Context) {
    // const { photo } = await ctx.getChat();
    // if (photo) {
    //   const file = await ctx.api.getFile(photo.small_file_id);
    //   this.downloadService.download(
    //     `https://api.telegram.org/file/bot${botData.token}/${file.file_path}`,
    //     'chat_photo',
    //     `${ctx.from.id}.jpg`,
    //   );
    // }
  }
}
