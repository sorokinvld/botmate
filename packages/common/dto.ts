import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export type CreateUserDTO = Omit<User, 'id'>;
export class LoginUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
