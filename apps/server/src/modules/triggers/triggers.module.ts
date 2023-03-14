import { Trigger } from '@/entities/trigger.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriggersController } from './triggers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trigger])],
  controllers: [TriggersController],
})
export class TriggersModule {}
