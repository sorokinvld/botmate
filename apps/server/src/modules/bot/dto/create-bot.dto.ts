import { ApiProperty } from '@nestjs/swagger';

export class CreateBotDTO {
  @ApiProperty()
  token: string;
}
