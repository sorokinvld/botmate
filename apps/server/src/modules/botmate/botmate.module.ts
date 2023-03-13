import { Settings } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsService } from '../settings/settings.service';
import { BotMateController } from './botmate.controller';
import { BotMateService } from './botmate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  controllers: [BotMateController],
  providers: [BotMateService, SettingsService],
})
export class BotMateModule {}
