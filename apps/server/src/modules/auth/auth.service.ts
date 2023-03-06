import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/users/user.service';
import { User } from '@/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) return null;
    if (user.password !== password) return null;

    return user;
  }

  login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: 'secret',
      }),
      user,
    };
  }

  async verify(token: string) {
    const decoded = (await this.jwtService.verifyAsync(token, {
      secret: 'secret',
    })) as User;
    if (!decoded) return null;

    const user = this.userService.getUserByEmail(decoded.email);
    console.log('user', user);
  }
}
