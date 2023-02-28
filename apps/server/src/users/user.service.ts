import { User } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/input/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
    };

    const newUser = this.userRepo.create({
      ...user,
    });

    await this.userRepo.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  async getUser(getUserArgs: GetUserArgs): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        id: getUserArgs.id,
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
