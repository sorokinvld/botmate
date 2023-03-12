import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AnnouncementsService } from './ancmt.service';
import { CreateAnnouncementDTO } from './dto/create-announcement';

@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private ancmtService: AnnouncementsService) {}

  @ApiQuery({
    name: 'botId',
    required: true,
  })
  @ApiQuery({
    name: 'chatId',
    required: true,
  })
  @Post()
  create(
    @Query('botId') botId: string,
    @Query('chatId') chatId: string,
    @Body() body: CreateAnnouncementDTO,
  ) {
    return this.ancmtService.createAnnouncement(botId, chatId, body.text);
  }
}
