import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SaveFilterDTO } from './dto/save-filter.dto';
import { FiltersService } from './filters.service';

@ApiTags('filters')
@Controller('filters')
export class FiltersController {
  constructor(private filterService: FiltersService) {}

  @Get()
  getFilters() {
    //
  }

  @Put()
  @ApiQuery({
    type: 'string',
    name: 'chatId',
  })
  @ApiQuery({
    type: 'string',
    name: 'botId',
  })
  saveFilters(
    @Query('chatId') chatId: string,
    @Query('botId') botId: string,
    @Body() data: SaveFilterDTO,
  ) {
    return this.filterService.saveFilter(botId, chatId, data.type, data.value);
  }
}
