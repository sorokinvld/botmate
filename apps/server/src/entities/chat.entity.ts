import { ApiProperty, ApiResponseProperty, OmitType } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bot } from './bot.entity';

export enum ChatType {
  PRIVATE = 'private',
  GROUP = 'group',
  SUPERGROUP = 'supergroup',
  CHANNEL = 'channel',
}

@Entity({ name: 'chats' })
export class Chat {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  chat_id: string;

  @ApiProperty({
    enum: ChatType,
  })
  @Column()
  type: string;

  @ApiProperty()
  @Column({ nullable: true })
  username: string;

  @ApiProperty()
  @Column({ nullable: true })
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  first_name: string;

  @ApiProperty()
  @Column({ nullable: true })
  last_name: string;

  @ApiProperty({
    type: String,
  })
  @ManyToOne(() => Bot, (bot) => bot.chats, {
    onDelete: 'CASCADE',
  })
  bot: Bot;
}
