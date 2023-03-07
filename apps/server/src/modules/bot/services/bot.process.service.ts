import { Bot as TelegramBot } from 'grammy';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Bot } from '@/entities/bot.entity';
import { Repository } from 'typeorm';
import { BotStatus } from '@/common/bot.types';

@Injectable()
export class BotProcessService {
  processes: Map<string, TelegramBot> = new Map();

  constructor(@InjectRepository(Bot) private botRepository: Repository<Bot>) {}

  async startBot(botId: string) {
    const botData = await this.botRepository.findOne({ where: { id: botId } });
    if (!botData) throw new Error('Bot not found');

    try {
      const bot = new TelegramBot(botData.token);
      await bot.init();

      bot.command('start', (ctx) => ctx.reply("I'm alive!"));
      bot.start();

      this.processes.set(botId, bot);
    } catch (e) {
      console.log('e', e);
      // todo: log error to database
      throw new Error('Unable to start bot');
    }

    await this.botRepository.update(
      { id: botId },
      {
        status: BotStatus.ACTIVE,
      },
    );

    return true;
  }

  async stopBot(botId: string) {
    const bot = this.processes.get(botId);
    if (!bot) return;

    await bot.stop();

    await this.botRepository.update(
      { id: botId },
      {
        status: BotStatus.INACTIVE,
      },
    );

    return true;
  }
}
