import { BotStatus } from '@/common/bot.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
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
  createdAt: string;

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.bots)
  user: User;
}
