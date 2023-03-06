import { PrismaService } from '@modules/db/prisma.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async createUser(createUserInput: CreateUserDTO) {
    const newUser = await this.db.user.create({
      data: {
        ...createUserInput,
        avatar: 'https://bit.ly/code-beast',
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

  async getUsersCount() {
    const usersCount = await this.db.user.count();
    return usersCount;
  }

  public getUsers(): User[] {
    return [];
  }

  // public updateUser() {}
  // public deleteUser() {}
}
