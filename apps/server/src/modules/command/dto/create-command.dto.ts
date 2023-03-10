import { Command } from '@/entities';
import { OmitType } from '@nestjs/swagger';

export class CreateCommandDTO extends OmitType(Command, ['id', 'createdAt']) {}
