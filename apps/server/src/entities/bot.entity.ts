import { BotStatus } from '@/common/bot.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Chat } from './chat.entity';
import { Command } from './command.entity';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity({ name: 'bots' })
export class Bot {
  @ApiProperty()
  @PrimaryColumn({ unique: true })
  id: string; // Telegram Bot ID

  @ApiProperty()
  @Column()
  first_name: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  token: string;

  @ApiPropertyOptional()
  @Column()
  avatar: string;

  @ApiPropertyOptional({
    enum: BotStatus,
  })
  @Column({ default: BotStatus.INACTIVE })
  status: BotStatus;

  @ApiPropertyOptional()
  @Column()
  created_at: string;

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.bots)
  user: User;

  @ApiProperty({
    type: () => [Command],
  })
  @OneToMany(() => Command, (command) => command.bot)
  commands: Command[];

  @ApiProperty({
    type: () => [Chat],
  })
  @OneToMany(() => Chat, (chat) => chat.bot)
  chats: Chat[];

  @ApiProperty()
  @OneToMany(() => Conversation, (conversation) => conversation.bot)
  conversations: Conversation[];
}
