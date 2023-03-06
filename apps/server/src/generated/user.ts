import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserProps {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  avatar?: string;

  @ApiProperty({ type: String })
  password: string;
}
