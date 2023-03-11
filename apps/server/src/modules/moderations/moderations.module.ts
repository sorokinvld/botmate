import { Conf } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModerationsController } from './moderations.controller';
import { ModerationsService } from './moderations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conf])],
  controllers: [ModerationsController],
  providers: [ModerationsService],
})
export class ModerationsModule {}
