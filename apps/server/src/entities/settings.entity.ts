import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SettingsScope {
  GLOBAL = 'global',
  BOT = 'bot',
  CHAT = 'chat',
  USER = 'user',
}

@Entity({ name: 'settings' })
export class Settings {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  key: string;

  @ApiProperty({
    enum: SettingsScope,
  })
  @Column({ default: SettingsScope.GLOBAL })
  scope: string;

  @ApiProperty({
    type: 'any',
  })
  @Column({ type: 'json' })
  value: any;
}
