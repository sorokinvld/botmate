import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/is-first-user')
  public async isFirstUser() {
    const usersCount = await this.userService.getUsersCount();
    return usersCount === 0;
  }

  @UseGuards(LocalAuthGuard)
  @Get('/profile')
  public async profile(@Request() req: Request) {
    console.log('req', req);
    const usersCount = await this.userService.getUsersCount();
    return usersCount === 0;
  }
}
