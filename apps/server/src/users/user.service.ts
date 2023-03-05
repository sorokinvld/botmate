import { PrismaService } from '@/database/prisma.service';
import { User } from '@botmate/database';
import { Injectable } from '@nestjs/common';

type CreateUserDTO = Omit<User, 'id'>;

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async createUser(createUserInput: CreateUserDTO) {
    const newUser = await this.db.user.create({
      data: {
        ...createUserInput,
      },
    });

    return newUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.db.user.findFirst({ where: { email } });
    return user;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.db.user.findFirst({
      where: {
        id: id,
      },
    });

    return user;
  }

  public getUsers(): User[] {
    return [];
  }

  // public updateUser() {}
  // public deleteUser() {}
}
