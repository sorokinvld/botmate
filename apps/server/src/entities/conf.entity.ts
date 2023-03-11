import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// this entity stores data in a key-value stucture

export enum ConfType {
  BOT = 'bot',
  CHAT = 'chat',
}

@Entity({ name: 'configurations' })
export class Conf {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  key: string;

  @ApiProperty({
    enum: ConfType,
  })
  @Column({ nullable: true, enum: ConfType })
  type: string;

  @ApiProperty({
    type: 'any',
  })
  @Column({ type: 'json' })
  value: any;
}
