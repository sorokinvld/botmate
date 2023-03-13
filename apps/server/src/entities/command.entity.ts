import { CommandProp } from '@/common/command.types';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bot } from './bot.entity';

@Entity({ name: 'commands' })
export class Command {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  command: string;

  @ApiProperty()
  @Column({ default: '' })
  script?: string;

  @ApiProperty({ default: false })
  @Column({ default: false })
  enabled?: boolean;

  @ApiProperty({ default: false })
  @Column({ default: false })
  privateCommand?: boolean;

  @ApiProperty({ default: false, type: () => [CommandProp] })
  @Column({ default: [], type: 'json' })
  props: CommandProp[];

  @ApiProperty({
    type: String,
  })
  @ManyToOne(() => Bot, (bot) => bot.commands)
  bot: Bot;

  @ApiProperty()
  @Column()
  createdAt: string;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
