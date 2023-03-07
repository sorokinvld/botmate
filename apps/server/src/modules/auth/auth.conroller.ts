import { Request } from 'express';
import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiProperty,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '@modules/users/user.service';
import { LoginUserDTO } from './dto/login-user-dto';
import { User } from '@/entities/user.entity';
import { RegisterUserDTO } from './dto/register-user.dto';
import { ErrorResponse } from '@common/error.response';

class LoginApiResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: User;
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

  @ApiOkResponse({
    type: LoginApiResponse,
  })
  @Post('register')
  async register(@Body() body: RegisterUserDTO): Promise<LoginApiResponse> {
    try {
      const userData = await this.userService.createUser(body);
      return {
        accessToken: this.authService.sign({
          id: userData.id,
          email: userData.email,
        }),
        user: userData,
      };
    } catch (e) {
      throw new HttpException('An error occurred while creating user', 500);
    }
  }
}