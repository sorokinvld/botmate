import { Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { SettingsService } from '../settings/settings.service';
import { BotMateService } from './botmate.service';

class VersionApiResult {
  @ApiProperty()
  version: string;
}

@ApiTags('botmate')
@Controller('botmate')
export class BotMateController {
  constructor(
    private bmService: BotMateService,
    private readonly confService: SettingsService,
  ) {}

  @ApiOkResponse({
    description: 'Returns the version of the BotMate server',
    type: VersionApiResult,
  })
  @Get('version')
  async getVersion() {
    const version = await this.bmService.getVersion();
    return { version };
  }

  @Post('update')
  update() {
    return this.bmService.update();
  }
}
