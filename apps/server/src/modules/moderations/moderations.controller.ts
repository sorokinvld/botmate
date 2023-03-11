import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SaveModDTO } from './dto/save-mod.dto';
import { ModerationsService } from './moderations.service';

@ApiTags('mods')
@Controller('mods')
export class ModerationsController {
  constructor(private modService: ModerationsService) {}

  @Put()
  @ApiQuery({
    type: 'string',
    name: 'chatId',
  })
  @ApiQuery({
    type: 'string',
    name: 'botId',
  })
  saveModeration(
    @Query('chatId') chatId: string,
    @Query('botId') botId: string,
    @Body() data: SaveModDTO,
  ) {
    return this.modService.saveModeration(chatId, botId, data);
  }

  @Get()
  @ApiQuery({
    type: 'string',
    name: 'chatId',
  })
  @ApiQuery({
    type: 'string',
    name: 'botId',
  })
  getModeration(
    @Query('chatId') chatId: string,
    @Query('botId') botId: string,
  ) {
    return this.modService.getModeration(chatId, botId);
  }
}
