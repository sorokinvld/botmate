import { Bot } from '@/entities/bot.entity';
import { OmitType } from '@nestjs/swagger';

export class GetBotsDTO extends OmitType(Bot, ['user']) {}
