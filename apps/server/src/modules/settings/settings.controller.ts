import { Body, Controller, Put } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SettingsUpdateDTO } from './dto/settings-update.dto';
import { SettingsService } from './settings.service';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiQuery({
    name: 'scope',
    description: 'The scope of the setting',
  })
  @Put()
  async update(@Body() body: SettingsUpdateDTO) {
    const { scope, key, value } = body;
    return this.settingsService.save(key, value, scope);
  }
}
