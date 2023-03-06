import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @ApiPropertyOptional()
  @Column()
  isAdmin: boolean;

  @ApiPropertyOptional()
  @Column()
  createdAt: string;
}
