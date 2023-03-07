import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'bots' })
export class Bot {
  @ApiProperty()
  @PrimaryColumn()
  id: number; // Telegram Bot ID

  @ApiProperty()
  @Column()
  first_name: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  token: string;

  @ApiPropertyOptional()
  @Column()
  avatar: string;

  @ApiPropertyOptional()
  @Column()
  createdAt: string;

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.bots)
  user: User;
}
