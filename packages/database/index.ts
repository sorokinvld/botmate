import { PrismaClient, User } from '@prisma/client';

const db = new PrismaClient();
export { db };
export * from '@prisma/client';

export type CreateUserDTO = Omit<User, 'id'>;
