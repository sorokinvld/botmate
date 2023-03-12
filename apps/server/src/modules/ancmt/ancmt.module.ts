import { Bot } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementsController } from './ancmt.controller';
import { AnnouncementsService } from './ancmt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bot])],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
})
export class AnnouncementsModule {}
