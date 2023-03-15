import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bot } from './bot.entity';

@Entity({ name: 'conversations' })
export class Conversation {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  script: string;

  @ApiProperty({
    type: () => Bot,
  })
  @ManyToOne(() => Bot, (bot) => bot.conversations)
  bot: Bot;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
