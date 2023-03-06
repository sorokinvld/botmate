import { Request } from 'express';
import { User } from '@prisma/client';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDTO } from 'common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UserProps } from '@/generated/user';

@ApiTags('user')
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiProperty({
    description: 'The user profile',
    type: LoginUserDTO,
  })
  @ApiOkResponse({
    description: 'The user profile',
    type: UserProps,
  })
  public async profile(@Req() req: Request) {
    return req.user as User;
  }
}
