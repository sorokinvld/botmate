import { Command } from '@/entities';
import { OmitType } from '@nestjs/swagger';

export class UpdateCommandDTO extends OmitType(Command, [
  'id',
  'bot',
  'createdAt',
]) {}
