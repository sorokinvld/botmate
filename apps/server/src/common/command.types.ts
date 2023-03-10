/* eslint-disable @typescript-eslint/ban-types */

type CommandPropType = 'text' | 'number' | 'switch' | 'select';

export class CommandProp {
  name: string;
  label: string;
  type: CommandPropType;
}
