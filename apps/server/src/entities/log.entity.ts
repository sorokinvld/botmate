import { LogLevel, LogType } from '@/common/log.types';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  message: string;

  @ApiProperty()
  @Column({
    enum: LogLevel,
  })
  level: LogLevel;

  @ApiProperty({
    enum: LogType,
  })
  @Column()
  type: LogType;

  @ApiProperty()
  @Column()
  timestamp: string;
}
