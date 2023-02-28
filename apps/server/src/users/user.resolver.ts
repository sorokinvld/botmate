import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard';
import { User } from '@/entities/user.entity';

import { UserService } from './user.service';
import { GetUserArgs } from './dto/args/get-user.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user', nullable: false })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.userService.getUser(getUserArgs);
  }
}
