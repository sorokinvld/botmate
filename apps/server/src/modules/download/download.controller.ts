import { createReadStream, existsSync } from 'fs';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('download')
@Controller('download')
export class DownloadController {
  @Get(':type/:fileName')
  async download(
    @Param('type') type: string,
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const path = `data/downloads/${type}/${fileName}`;
    if (existsSync(path)) {
      const file = createReadStream(`data/downloads/${type}/${fileName}`);
      file.pipe(res);
    }
  }
}
