import { User } from '@prisma/client';
import { UserService } from '@modules/users/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(validationPayload: {
    email: string;
    sub: string;
  }): Promise<User> {
    return await this.userService.getUserByEmail(validationPayload.email);
  }
}
