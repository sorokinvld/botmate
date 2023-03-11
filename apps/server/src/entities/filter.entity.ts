import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum FilterType {
  MESSAGES = 'messages',
  SERVICE_MESSAGES = 'service_messages',
  WORDS = 'words',
  ADVANCED = 'advanced',
}

@Entity({ name: 'filters' })
export class Filter {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  chat_id: string;

  @ApiProperty()
  @Column()
  bot_id: string;

  @ApiProperty({
    enum: FilterType,
  })
  @Column({
    enum: FilterType,
  })
  type: string;

  @ApiProperty()
  @Column({ type: 'json' })
  value: any;
}
