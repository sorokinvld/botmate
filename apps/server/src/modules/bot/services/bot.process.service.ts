import { Bot as TelegramBot, session } from 'grammy';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Bot } from '@/entities/bot.entity';
import { Repository } from 'typeorm';
import { BotStatus } from '@/common/bot.types';
import { CommandService } from '@modules/command/command.service';
import { BotMateLogger } from '@/common';
import { Chat } from '@/entities/chat.entity';
import { DownloadService } from '@/modules/download/download.service';
import { BotFilterService } from './bot.filter.service';
import { OnEvent } from '@nestjs/event-emitter';
import { BotRestartEvent } from '../events/bot-restart.event';
import { conversations, createConversation } from '@grammyjs/conversations';
import { Conversation } from '@/entities';
import { NodeVM } from 'vm2';
import { BotSandbox } from './bot.sandbox';
import { SocketService } from '@/gateways/socket.service';

@Injectable()
export class BotProcessService {
  processes: Map<string, TelegramBot> = new Map();
  private readonly logger = new BotMateLogger(BotProcessService.name);

  constructor(
    @InjectRepository(Bot) private botRepository: Repository<Bot>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Conversation)
    private cnvRepository: Repository<Conversation>,
    private cmdService: CommandService,
    private downloadService: DownloadService,
    private filterService: BotFilterService,
    private botSandbox: BotSandbox,
    private socketService: SocketService,
  ) {}

  async startBot(botId: string) {
    const botData = await this.botRepository.findOne({ where: { id: botId } });
    if (!botData) throw new Error('Bot not found');

    try {
      const bot = new TelegramBot(botData.token);

      bot.use(
        session({
          initial() {
            return {};
          },
        }),
      );

      bot.use(conversations());

      const botConversations = await this.cnvRepository.find({
        where: {
          bot: {
            id: botId,
          },
        },
      });

      const vm = new NodeVM({
        sandbox: {
          Bot: bot,
          createConversation,
          ...this.botSandbox.getSandbox(botData.id),
        },
      });

      for (const cnv of botConversations) {
        vm.run(`
            async function cnv_${cnv.id}(conversation, Ctx) {
              ${cnv.script}
            }
            Bot.use(createConversation(cnv_${cnv.id}, '${cnv.name}'));
        `);
      }

      const botCommands = await this.cmdService.findAllCommands(botId);

      for (const botCommand of botCommands) {
        const { command, script } = botCommand;

        if (command.startsWith('/')) {
          const cmd = command.replace('/', '');
          vm.run(
            `Bot.command('${cmd}', async (Ctx) => {
                ${script}
              });
            `,
          );
        } else {
          try {
            vm.run(`Bot.on('${command}', async (Ctx) => {
              ${script}
            });`);
          } catch (e) {
            vm.run(`Bot.hears('${command}', async (Ctx) => {
              ${script}
            });`);
          }
        }
      }

      bot.catch((err) => {
        this.logger.error(err);
        this.socketService.socket
          .to(botData.id)
          .emit('bot:error', err.toString());
      });

      /**
       * Filter Messages
       */

      this.filterService.setupFilters(bot);

      /**
       * download the profile picture of the chat after joining
       */
      bot.on(':new_chat_members:me', async (ctx) => {
        this.logger.debug('Joined new chat: ' + ctx.chat.id.toString());
        const chat = await ctx.getChat();
        if (chat.photo) {
          const file = await ctx.api.getFile(chat.photo.small_file_id);
          this.downloadService.download(
            `https://api.telegram.org/file/bot${botData.token}/${file.file_path}`,
            'photo',
            `${ctx.chat.id.toString()}.jpg`,
          );
        }
      });

      /**
       * update user and chat information in the db when a message is received
       */
      bot.use(async (ctx, next) => {
        //
        this.socketService.socket
          .to(botData.id)
          .emit('bot:message', ctx.message);

        next();
        try {
          let chat: Chat;

          const exist = await this.chatRepository.count({
            where: {
              chat_id: ctx.chat.id.toString(),
              bot: {
                id: botId,
              },
            },
          });

          if (exist > 0) return;

          /**
           *  download the profile picture of the user who sent the message
           */
          const userPhoto = await ctx.getUserProfilePhotos();
          if (userPhoto) {
            const lastestPhoto = userPhoto.photos[0][0];
            const file = await ctx.api.getFile(lastestPhoto.file_id);

            this.downloadService.download(
              `https://api.telegram.org/file/bot${botData.token}/${file.file_path}`,
              'photo',
              `${ctx.from.id.toString()}.jpg`,
            );
          }

          if (ctx.chat.type === 'private') {
            chat = this.chatRepository.create({
              chat_id: ctx.chat.id.toString(),
              type: ctx.chat.type,
              title: '',
              first_name: ctx.chat.first_name,
              last_name: ctx.chat.last_name,
              bot: {
                id: botId,
              },
            });
          } else {
            chat = this.chatRepository.create({
              chat_id: ctx.chat.id.toString(),
              type: ctx.chat.type,
              title: ctx.chat.title,
              first_name: '',
              last_name: '',
              bot: {
                id: botId,
              },
            });
          }

          await this.chatRepository.save(chat);
        } catch (e) {
          this.logger.error('Error while saving chat');
          this.logger.error(e);
        }
      });

      bot.start();

      this.processes.set(botId, bot);
    } catch (e) {
      this.logger.error('Error while starting bot: ' + botId);
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

  async startAllBots() {
    let count = 0;
    const bots = await this.botRepository.find({
      where: {
        status: BotStatus.ACTIVE,
      },
    });

    for (const bot of bots) {
      await this.startBot(bot.id);
      count++;
    }

    this.logger.debug(`Auto restarted ${count} bot(s)`);
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

  @OnEvent('bot.restart')
  async restartBot(data: BotRestartEvent) {
    this.logger.debug('Restarting bot: ' + data.botId);
    const { botId } = data;
    await this.stopBot(botId);
    await this.startBot(botId);
  }
}
