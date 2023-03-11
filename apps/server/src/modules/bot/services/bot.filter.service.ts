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

  async filterMessage(bot: Bot, ctx: Context) {
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
