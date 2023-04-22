import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors()
  await app.listen(process.env.PORT);
  console.log(`Server running on PORT ${process.env.PORT}`);
}
bootstrap();
