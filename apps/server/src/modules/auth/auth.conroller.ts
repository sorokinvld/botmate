import { Request } from 'express';
import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { UserProps } from '@/generated/user';
import { UserService } from '@modules/users/user.service';
import { CreateUserDTO } from '@modules/users/dto/create-user.dto';

class LoginUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

class LoginApiResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserProps;
}

class ErrorResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginApiResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req() req: Request, @Body() _body: LoginUserDTO) {
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
