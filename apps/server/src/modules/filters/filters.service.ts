import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filter, FilterType } from '@/entities/filter.entity';

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(Filter) private readonly filterRepo: Repository<Filter>,
  ) {}

  async saveFilter(
    botId: string,
    chatId: string,
    type: FilterType,
    value: any,
  ) {
    const exist = await this.filterRepo.findOne({
      where: {
        bot_id: botId,
        chat_id: chatId,
        type,
      },
    });

    if (exist) {
      exist.value = value;
      return this.filterRepo.save(exist);
    }

    const filter = this.filterRepo.create({
      bot_id: botId,
      chat_id: chatId,
      type,
      value,
    });

    return this.filterRepo.save(filter);
  }

  async getFilter(botId: string, chatId: string, type: FilterType) {
    return this.filterRepo.findOne({
      where: {
        bot_id: botId,
        chat_id: chatId,
        type,
      },
    });
  }
}
