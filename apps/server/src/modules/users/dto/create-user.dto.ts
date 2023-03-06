import { User } from '@/entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDTO extends OmitType(User, ['id', 'createdAt']) {}
