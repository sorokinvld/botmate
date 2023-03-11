import { Module } from '@nestjs/common';
import { BotMateController } from './botmate.controller';
import { BotMateService } from './botmate.service';

@Module({
  controllers: [BotMateController],
  providers: [BotMateService],
})
export class BotMateModule {}
