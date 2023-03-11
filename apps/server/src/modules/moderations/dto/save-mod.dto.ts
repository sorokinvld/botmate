import { ApiProperty } from '@nestjs/swagger';

export class SaveModDTO {
  @ApiProperty()
  type: string;

  @ApiProperty()
  value: any;
}
