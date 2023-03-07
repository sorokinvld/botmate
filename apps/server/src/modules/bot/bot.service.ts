import { Bot } from '@/entities/bot.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BotService {
  constructor(@InjectRepository(Bot) private botRepository: Repository<Bot>) {}

  getBotsByUserId(id: number) {
    return this.botRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }
}
