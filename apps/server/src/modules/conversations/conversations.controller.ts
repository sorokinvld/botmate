import { Conversation } from '@/entities';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { ConversationsService } from './conversations.service';
import { UpdateConversationDTO } from './dto/update-conversation.dto';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly cnvService: ConversationsService) {}

  @ApiQuery({
    name: 'botId',
    required: true,
  })
  @ApiOkResponse({
    type: () => Conversation,
    isArray: true,
  })
  @Get()
  findConversations(@Query('botId') botId: string) {
    return this.cnvService.getConversationsByBotId(botId);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiOkResponse({
    type: () => Conversation,
  })
  @Get(':id')
  findConversation(@Param('id') id: number) {
    return this.cnvService.getConversationsById(id);
  }

  @ApiQuery({
    name: 'botId',
    required: true,
  })
  @ApiOkResponse({
    type: Conversation,
  })
  @Post()
  createConversation(
    @Query('botId') botId: string,
    @Body() body: CreateConversationDTO,
  ) {
    return this.cnvService.createConversation(botId, body);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @Put(':id')
  updateConversation(
    @Param('id') id: number,
    @Body() body: UpdateConversationDTO,
  ) {
    return this.cnvService.updateConversation(id, body);
  }
}
