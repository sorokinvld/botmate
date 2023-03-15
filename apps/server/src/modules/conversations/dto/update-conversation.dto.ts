import { Conversation } from '@/entities';
import { OmitType } from '@nestjs/swagger';

export class UpdateConversationDTO extends OmitType(Conversation, [
  'id',
  'bot',
  'updatedAt',
]) {}
