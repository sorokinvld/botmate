import { Filter, FilterType } from '@/entities/filter.entity';
import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SaveFilterDTO } from './dto/save-filter.dto';
import { FiltersService } from './filters.service';

@ApiTags('filters')
@Controller('filters')
export class FiltersController {
  constructor(private filterService: FiltersService) {}

  @Get()
  @ApiQuery({
    type: 'string',
    name: 'chatId',
  })
  @ApiQuery({
    type: 'string',
    name: 'botId',
  })
  @ApiQuery({
    enum: FilterType,
    name: 'type',
  })
  @ApiOkResponse({
    type: Filter,
  })
  getFilters(
    @Query('chatId') chatId: string,
    @Query('botId') botId: string,
    @Query('type') type: FilterType,
  ) {
    return this.filterService.getFilter(botId, chatId, type);
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
