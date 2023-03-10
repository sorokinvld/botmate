import { Bot as TelegramBot } from 'grammy';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Bot } from '@/entities/bot.entity';
import { Repository } from 'typeorm';
import { BotStatus } from '@/common/bot.types';
import { CommandService } from '@modules/command/command.service';
import { BotScriptService } from './bot.script.service';
import { BotMateLogger } from '@/common';

@Injectable()
export class BotProcessService {
  processes: Map<string, TelegramBot> = new Map();
  private readonly logger = new BotMateLogger(BotScriptService.name);

  constructor(
    @InjectRepository(Bot) private botRepository: Repository<Bot>,
    private cmdServie: CommandService,
    private scriptService: BotScriptService,
  ) {}

  async startBot(botId: string) {
    const botData = await this.botRepository.findOne({ where: { id: botId } });
    if (!botData) throw new Error('Bot not found');

    try {
      const bot = new TelegramBot(botData.token);
      await bot.init();

      bot.on(':text', async (ctx) => {
        this.logger.debug(`processing message: "${ctx.message.text}"`);
        const command = await this.cmdServie.findCommand(
          botId,
          ctx.message.text,
        );
        if (!command) return;

        this.scriptService.runScript(command.script, ctx);
      });

      bot.start();

      this.processes.set(botId, bot);
    } catch (e) {
      this.logger.log('Error while starting bot: ' + botId);
      this.logger.error(e);
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
