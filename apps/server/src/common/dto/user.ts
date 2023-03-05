import { User } from '@botmate/database';

export type CreateUserDTO = Omit<User, 'id'>;
