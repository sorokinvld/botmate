import { Request } from 'express';
import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@botmate/database';
import { UserService } from '@/users/user.service';
import { CreateUserDTO } from '@/common/dto/user';

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
  async register(@Body() body: CreateUserDTO) {
    try {
      const userData = await this.userService.createUser(body);
      return userData;
    } catch (e) {
      throw new HttpException('An error occurred while creating user', 500);
    }
  }
}
