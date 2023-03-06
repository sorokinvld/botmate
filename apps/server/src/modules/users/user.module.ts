import { Module } from '@nestjs/common';
import { PrismaService } from '@modules/db/prisma.service';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
