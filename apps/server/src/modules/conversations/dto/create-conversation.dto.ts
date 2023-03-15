import { Conversation } from '@/entities';
import { OmitType } from '@nestjs/swagger';

export class CreateConversationDTO extends OmitType(Conversation, [
  'id',
  'bot',
  'updatedAt',
]) {}
