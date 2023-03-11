import { BotMateLogger } from '@/common';
import { Conf } from '@/entities';
import { ChatType } from '@/entities/chat.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConfService {
  private logger = new BotMateLogger(ConfService.name);

  constructor(
    @InjectRepository(Conf)
    private readonly confRepo: Repository<Conf>,
  ) {}

  async save(key: string, value: any, type: ChatType, defaultValue?: any) {
    const conf = this.confRepo.create({
      key,
      value,
      type,
    });

    return this.confRepo.save(conf).catch((err) => {
      this.logger.error(err);
      return defaultValue;
    });
  }
}
