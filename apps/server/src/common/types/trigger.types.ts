import { ApiProperty } from '@nestjs/swagger';

export const triggerModes = ['all', 'replies', 'replies-to-bot'] as const;
export enum TriggerMode {
  ALL = 'all',
  REPLIES = 'replies',
  REPLIES_TO_BOT = 'replies-to-bot',
}

export enum TriggerMatchType {
  FULL_MATCH = 'full-match',
  PARTIAL = 'partial',
  STARTS_WITH = 'starts-with',
  REGEX = 'regex',
}

export enum TriggerActionType {
  SEND_MESSAGE = 'send-message',
  BAN = 'ban',
  KICK = 'kick',
  MUTE = 'mute',
  UNRESTRICT = 'unrestrict',
  DELETE = 'delete',
  WARN = 'warn',
  SCRIPT = 'script',
}

export enum TriggerConditionType {
  TEXT = 'text',
  PHOTO = 'photo',
  STICKER = 'sticker',
  REGEX = 'regex',
}

export type TriggerCondition = {
  type: TriggerConditionType;
  matchType: TriggerMatchType;
  value: string;
};

export class TriggerAction {
  @ApiProperty({
    enum: TriggerActionType,
  })
  type: string;

  @ApiProperty()
  value: string;
  @ApiProperty()
  mute_duration?: string;
  @ApiProperty()
  ban_duration?: string;
  @ApiProperty()
  warn_count?: number;
}

export type Trigger = {
  name: string;
  mode: TriggerMode;
  actions: TriggerAction[];
  conditions: TriggerCondition[];
};
