import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bot } from './bot.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: false })
  password: string;

  @ApiPropertyOptional()
  @Column()
  avatar: string;

  @ApiPropertyOptional({
    enum: UserRole,
  })
  @Column()
  role: UserRole;

  @ApiPropertyOptional()
  @Column()
  createdAt: string;

  @ApiProperty({
    type: () => [Bot],
  })
  @OneToMany(() => Bot, (bot) => bot.user)
  bots: Bot[];
}
