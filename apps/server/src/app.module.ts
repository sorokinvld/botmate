import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

// App Modules
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/users/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
