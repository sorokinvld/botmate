import { User } from '@/entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class RegisterUserDTO extends OmitType(User, ['id', 'createdAt']) {}
