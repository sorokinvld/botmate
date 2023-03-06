import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserDTO) {
    const totalUsers = await this.getUsersCount();
    const newUser = this.userRepo.create({
      ...createUserInput,
      isAdmin: totalUsers === 0,
      createdAt: new Date().toString(),
    });

    await this.userRepo.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        id: id,
      },
    });

    return user;
  }

  async getUsersCount() {
    const usersCount = await this.userRepo.count();
    return usersCount;
  }

  public getUsers(): User[] {
    return [];
  }

  // public updateUser() {}
  // public deleteUser() {}
}
