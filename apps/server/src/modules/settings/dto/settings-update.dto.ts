import { SettingsScope } from '@/entities';
import { ApiProperty } from '@nestjs/swagger';

export class SettingsUpdateDTO {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;

  @ApiProperty({
    enum: SettingsScope,
    default: SettingsScope.GLOBAL,
  })
  scope: string;
}
