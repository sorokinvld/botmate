import { Chat, ChatType } from '@/entities/chat.entity';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('chats')
@Controller()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get bot chats',
    type: [Chat],
  })
  @ApiQuery({
    type: 'string',
    name: 'botId',
  })
  @ApiQuery({
    type: 'string',
    name: 'type',
    description: 'Chat type',
    enum: ChatType,
  })
  async getBotChats(
    @Query('botId') botId: string,
    @Query('type') type: ChatType,
  ) {
    return this.chatService.getBotChats(botId, type);
  }
}
