import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000' });
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('BotMate API')
    .setDescription('BotMate API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('/api/docs', app, document);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get('PORT');

  await app.listen(PORT || 8080);
}

export { bootstrap as startServer };
