import { Injectable } from '@nestjs/common';
import { SaveModDTO } from './dto/save-mod.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conf } from '@/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ModerationsService {
  constructor(
    @InjectRepository(Conf) private readonly confRepo: Repository<Conf>,
  ) {}

  async saveModeration(botId: string, chatId: string, data: SaveModDTO) {
    const key = `mods:${botId}:${chatId}`;

    const exist = await this.confRepo.findOne({
      where: {
        key,
        type: data.type,
      },
    });

    if (exist) {
      exist.value = data.value;
      return this.confRepo.save(exist);
    }

    const conf = this.confRepo.create({
      key,
      value: data.value,
      type: data.type,
    });

    return this.confRepo.save(conf);
  }

  async getModeration(botId: string, chatId: string) {
    const key = `mods:${botId}:${chatId}`;

    const confs = await this.confRepo.find({
      where: {
        key,
      },
    });

    return confs.reduce((acc, conf) => {
      acc[conf.type] = conf.value;
      return acc;
    }, {});
  }
}
