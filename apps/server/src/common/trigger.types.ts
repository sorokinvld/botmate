export const ActionType = [
  'send_message',
  'kick',
  'ban',
  'mute',
  'unrestrict',
  'delete',
  'warn',
] as const;

export type ConditionType =
  | 'full_match'
  | 'contains'
  | 'regex'
  | 'starts_with'
  | 'ends_with';

export type Condition = {
  text: string;
  type: ConditionType;
};

export type Action = {
  type: (typeof ActionType)[number];
  conditions: Condition[];
};

export type Trigger = {
  title: string;
  mode: 'all' | 'replies' | 'mentions';

  conditions: Condition[];
  actions: Action[];
};
