import { BotMateLogger } from '@/common';
import { Filter, FilterType } from '@/entities/filter.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot, Context } from 'grammy';
import { Repository } from 'typeorm';

type Method = 'allow' | 'block';

// TODO: refactor code, many repeated code

@Injectable()
export class BotFilterService {
  private readonly logger = new BotMateLogger(BotFilterService.name);
  constructor(
    @InjectRepository(Filter) private filterRepository: Repository<Filter>,
  ) {}

  setupFilters(bot: Bot) {
    bot.use(async (ctx, next) => {
      next();

      const filterData = await this.filterRepository.find({
        where: {
          bot_id: ctx.me.id.toString(),
          chat_id: ctx.chat.id.toString(),
        },
      });

      if (!filterData) return;

      const messagesFilterData = filterData.find(
        (filter) => filter.type === FilterType.MESSAGES,
      );
      const serviceMessagesFilterData = filterData.find(
        (filter) => filter.type === FilterType.SERVICE_MESSAGES,
      );
      const wordsFilterData = filterData.find(
        (filter) => filter.type === FilterType.WORDS,
      );

      if (messagesFilterData) {
        this.filterMessage(ctx);
      }

      if (serviceMessagesFilterData) {
        this.filterServiceMessage(ctx, serviceMessagesFilterData.value);
      }

      if (wordsFilterData) {
        this.filterWords(ctx, wordsFilterData.value);
      }
    });
  }

  async filterWords(ctx: Context, data: any) {
    if (ctx.message.text) {
      const userWords = ctx.message.text.split(' ');
      const words = data.words.split(',');

      for (let userWord of userWords) {
        userWord = userWord.toLowerCase();

        if (words.includes(userWord)) {
          ctx.deleteMessage();
          break;
        }
      }
    }
  }

  async filterServiceMessage(ctx: Context, data: any) {
    if (ctx.message.new_chat_members?.length > 0) {
      if (data.new_chat_members) {
        ctx.deleteMessage();
      }
    }

    if (ctx.message.left_chat_member) {
      if (data.left_chat_member) {
        ctx.deleteMessage();
      }
    }

    if (ctx.message.pinned_message) {
      if (data.pinned_message) {
        ctx.deleteMessage();
      }
    }
  }

  async filterMessage(ctx: Context) {
    const filterData = await this.filterRepository.findOne({
      where: {
        bot_id: ctx.me.id.toString(),
        chat_id: ctx.chat.id.toString(),
        type: FilterType.MESSAGES,
      },
    });

    if (!filterData) return;

    const messageTypes = Object.keys(filterData.value);

    /**
     * Link Filters
     */
    function filterLinks() {
      const method: Method = filterData.value.links.method;
      const filteredUrls: string[] = filterData.value.links.filter.split(',');

      const text = ctx.message.text || '';

      // regex to match url
      const regex = /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi;
      const urls = text.match(regex);

      if (urls) {
        urls.forEach((url) => {
          const urlObject = new URL(url.toLowerCase());
          if (filteredUrls.includes(urlObject.hostname)) {
            if (method === 'block') {
              ctx.deleteMessage();
            }
          } else {
            if (method === 'allow') {
              ctx.deleteMessage();
            }
          }
        });
      } else
        ctx.message.entities?.forEach((entity) => {
          if (entity.type === 'url') {
            if (messageTypes.includes('links')) {
              const url = ctx.message.text.substring(
                entity.offset,
                entity.offset + entity.length,
              );

              try {
                if (filteredUrls.includes(url)) {
                  if (method === 'block') {
                    ctx.deleteMessage();
                  }
                } else {
                  if (method === 'allow') {
                    ctx.deleteMessage();
                  }
                }
              } catch (e) {
                console.log('e', e);
              }
            }
          }
        });
    }

    /**
     * Sticker Filter
     */
    function filterSticker() {
      const stickers = filterData.value.stickers;

      if (!ctx.message.sticker) return;
      if (!stickers) return;

      const method: Method = stickers.method || 'allow';
      const filteredStickers: string[] =
        stickers?.filter.length > 1 ? stickers.filter.split(',') : [];

      // if stickers are blocked [all sticker pack]
      if (method === 'block' && filteredStickers.length === 0) {
        if (filteredStickers.length === 0) {
          ctx.deleteMessage();
        }
      }

      for (let stickerPack of filteredStickers) {
        stickerPack = stickerPack.trim();
        // if sticker pack is blocked [speicific sticker pack]
        if (method === 'block') {
          if (ctx.message.sticker.set_name === stickerPack) {
            ctx.deleteMessage();
            return;
          }
        } else {
          // if sticker pack is allowed [speicific sticker pack]
          if (ctx.message.sticker.set_name !== stickerPack) {
            ctx.deleteMessage();
            return;
          }
        }
      }
    }

    /**
     * Mentions Filter
     */
    function filterMentions() {
      const mentions = filterData.value.mentions;

      if (!mentions) return;

      const method: Method = mentions.method || 'allow';
      const filteredMentions: string[] =
        mentions?.filter.length > 1 ? mentions.filter.split(',') : [];

      // if mentions are blocked [all mentions]
      if (method === 'block' && filteredMentions.length === 0) {
        if (filteredMentions.length === 0) {
          ctx.deleteMessage();
        }
      }

      ctx.message.entities?.forEach((entity) => {
        if (entity.type === 'mention') {
          let mention = ctx.message.text.substring(
            entity.offset,
            entity.offset + entity.length,
          );

          mention = mention.replace('@', '');

          for (let filteredMention of filteredMentions) {
            filteredMention = filteredMention.trim();

            // if mention is blocked [speicific mention]
            if (method === 'block') {
              if (mention === filteredMention) {
                ctx.deleteMessage();
                return;
              }
            } else {
              // if mention is allowed [speicific mention]
              if (mention !== filteredMention) {
                ctx.deleteMessage();
                return;
              }
            }
          }
        }
      });
    }

    filterLinks();
    filterSticker();
    filterMentions();
  }
}
