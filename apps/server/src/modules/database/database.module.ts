import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from '@/entities/user.entity';
import { Bot } from '@/entities/bot.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        if (configService.get('DB_TYPE') === 'postgres') {
          return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            database: configService.get('DB_NAME'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            entities: [User, Bot],
            synchronize: true,
          };
        }

        return {
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [User, Bot],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
