import { UserProps } from '@/generated/user';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDTO extends OmitType(UserProps, ['id', 'avatar']) {}
