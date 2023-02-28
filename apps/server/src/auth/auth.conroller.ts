import { Request } from 'express';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { CreateUserInput } from '@/users/dto/input/create-user.input';
import { UserService } from '@/users/user.service';
import { User } from '@/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Post('register')
  register(@Body() body: CreateUserInput) {
    return this.userService.createUser(body);
  }
}
