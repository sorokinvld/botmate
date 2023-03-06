import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// App Modules
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
